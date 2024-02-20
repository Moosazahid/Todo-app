"use server";

export async function authenticate(formData:{ username:string; password:string}) {
    const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            formData
        )
      })
      return response.json()
}