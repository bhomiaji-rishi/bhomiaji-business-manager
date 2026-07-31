import { Outlet } from "react-router-dom";

export default function MainLayout() {

  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >

      <aside
        style={{
          width: "250px",
          background: "#2b2b2b",
          color: "white",
          padding: "20px",
        }}
      >
        <h2>Bhomiaji</h2>

        <hr />

        <p>Dashboard</p>
        <p>Products</p>
        <p>Retailers</p>
        <p>Orders</p>
        <p>Team</p>
        <p>Settings</p>

      </aside>

      <main
        style={{
          flex: 1,
          padding: "30px",
          background: "#f5f5f5",
        }}
      >
        <Outlet />
      </main>

    </div>

  );

}
