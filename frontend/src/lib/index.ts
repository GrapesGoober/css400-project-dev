// place files you want to import through the `$lib` alias in this folder.
import { Vector } from 'vecti';

export class Circle {
    position: Vector = new Vector(0, 0);
    velocity: Vector = new Vector(0, 0);
    radius: number = 15;

    update_position(dt: number) {
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
    accelerate_towards(to: Vector) {
        const COEF = 6;
        let delta_v: Vector = to.subtract(this.position);
        this.velocity = delta_v.multiply(COEF);
    }
}

export class Puck extends Circle {
    // detect that it collides with mallet,
    // and adjust its position and velocity accordingly
    resolve_mallet_collision(other: Circle) {
        let delta_pos: Vector = this.position.subtract(other.position);
        let normal: Vector = delta_pos.normalize()
		if (delta_pos.length() < this.radius + other.radius) {
			// calculate adjustment vector to move puck away from mallet
			let adj: Vector = normal
                .multiply(this.radius + other.radius)
                .subtract(delta_pos);
			this.position = this.position.add(adj);
			// calculate delta velocity to apply 
			let delta_v = other.velocity.subtract(this.velocity);
            let force = normal.multiply( delta_v.dot(normal) );
			this.velocity = this.velocity.add(force)
		}
    }

    // detect that it collides with wall,
    // and adjust its position and velocity accordingly
    resolve_wall_collision(width: number, height: number) {
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