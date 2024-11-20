export function getId() {
let id = localStorage.getItem("user-id");
if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("user-id", id);
}

return id;
}