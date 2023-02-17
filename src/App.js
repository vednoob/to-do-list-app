import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import { routesList } from "./routes";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {routesList.map((route, index) => {
            const Page = route.component;
            let Layout = MainLayout;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
