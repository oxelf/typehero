export function getId(){let e=localStorage.getItem("user-id");return e||(e=crypto.randomUUID(),localStorage.setItem("user-id",e)),e}
