// place files you want to import through the `$lib` alias in this folder.
import { Vector } from 'vecti';

export async function postGameState(mallet: Mallet, puck: Puck): Promise<string> {
    const res = await fetch("/api/record", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            puck_x: puck.position.x,
            puck_y: puck.position.y,
            puck_vx: puck.velocity.x,
            puck_vy: puck.velocity.y,
            mallet_x: mallet.position.x,
            mallet_y: mallet.position.y,
            mallet_vx: mallet.velocity.x,
            mallet_vy: mallet.velocity.y
        })
    })
    
    const json = await res.json();
    return JSON.stringify(json);
}

export class Circle {
    position: Vector = new Vector(0, 0);
    velocity: Vector = new Vector(0, 0);
    radius: number = 15;

    updatePosition(dt: number) {
        // update its position using velocity
        this.position = this.velocity
            .multiply(dt)
            .add(this.position);
    }
}

export class Mallet extends Circle {
    radius: number = 25;
    // accellerate to a new position with adjustable delta_v coef
    // higher the COEF, faster the mallet react to mouse
    accelerateTowards(to: Vector) {
        const COEF = 6;
        let deltaV: Vector = to.subtract(this.position);
        this.velocity = deltaV.multiply(COEF);
    }
    // restrict mallet position within bounds by clamping position and resetting velocity
    restrictBounds(min: Vector, max: Vector) {

        min = min.add(new Vector(this.radius, this.radius));
        max = max.subtract(new Vector(this.radius, this.radius));

        if (this.position.x > max.x || this.position.x < min.x) {
            this.velocity = this.velocity.hadamard(new Vector(0, 1));
        }
        if (this.position.y > max.y || this.position.y < min.y) {
            this.velocity = this.velocity.hadamard(new Vector(1, 0));
        }

        this.position = new Vector(
            Math.min(Math.max(min.x, this.position.x), max.x),
            Math.min(Math.max(min.y, this.position.y), max.y),
        );
    }

    async predictedAccelerateTowards(puck: Puck) {
        const res = await fetch("/api/predict", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                puck_x: puck.position.x,
                puck_y: puck.position.y,
                puck_vx: puck.velocity.x,
                puck_vy: puck.velocity.y,
                mallet_x: this.position.x,
                mallet_y: this.position.y,
            })
        })
        
        const json = await res.json();
        console.log(json);
        this.velocity = new Vector(
            json["mallet_vx"],
            json["mallet_vy"],
        );
    }
}

//Bot
export class OpponentMallet extends Mallet {
    speed: number = 500; 
    // move towards a target with a constant speed
    moveTowards(target: Vector) {
        const direction = target.subtract(this.position);
        if (direction.length() > 1) {
            this.velocity = direction.normalize().multiply(this.speed);
        } else {
            this.velocity = new Vector(0, 0);
        }
    }
}


export class Puck extends Circle {
    // detect that it collides with mallet,
    // and adjust its position and velocity accordingly
    resolveMalletCollision(other: Circle) {
        let deltaPos: Vector = this.position.subtract(other.position);
        let normal: Vector = deltaPos.normalize()
		if (deltaPos.length() < this.radius + other.radius) {
			// calculate adjustment vector to move puck away from mallet
			let adj: Vector = normal
                .multiply(this.radius + other.radius)
                .subtract(deltaPos);
			this.position = this.position.add(adj);
			// calculate delta velocity to apply 
			let deltaV = other.velocity.subtract(this.velocity);
            let force = normal.multiply( deltaV.dot(normal) );
			this.velocity = this.velocity.add(force)
		}
    }

    // detect that it collides with wall,
    // and adjust its position and velocity accordingly
    resolveWallCollision(width: number, height: number) {
        let borderLimit = new Vector(width - this.radius, height - this.radius);

        if (this.position.x > borderLimit.x || this.position.x < this.radius) {
            this.velocity = this.velocity.hadamard(new Vector(-1, 1));
        }
        if (this.position.y > borderLimit.y || this.position.y < this.radius) {
            this.velocity = this.velocity.hadamard(new Vector(1, -1));
        }
        
        // clamp position
        this.position = new Vector(
            Math.min(Math.max(this.radius, this.position.x), width - this.radius),
            Math.min(Math.max(this.radius, this.position.y), height - this.radius)
        );
    }
}