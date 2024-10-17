// place files you want to import through the `$lib` alias in this folder.

export async function post_api_ping(text: string): Promise<string> {
    const res = await fetch("/api/ping", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({text: text})
    })
    
    const json = await res.json();
    return JSON.stringify(json);
}