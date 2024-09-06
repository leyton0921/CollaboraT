import UserTasks from "../components/UserTask";

export default function Users() {

    const userId = 2;  // Simular un usuario autenticado
    return (
        
        <div>
            <h1>User View</h1>
            <UserTasks  userId={userId}></UserTasks>
        </div>
    )

}
