import * as React from 'react'


export function logClick(e: React.SyntheticEvent<any>) {
        console.log("clicked", (e.target as HTMLElement).textContent);
}
