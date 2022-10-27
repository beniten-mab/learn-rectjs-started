import { NavLink, useLocation } from "react-router-dom";

const AppLayout = (props) => {
  const { pathname } = useLocation();
  const inactiveClasses = "bg-gray-800 py-2 px-5 text-white rounded";
  const activeClasses = "bg-green-700 py-2 px-5 text-white rounded shadow";
  return (
    <div className="container mx-auto space-y-5 py-12 px-6">
      <div className="bg-gray-200 rounded p-3 space-y-3">
        <h1 className="text-3xl font-bold">Movie Rating</h1>
        <div className="w-full lg:w-1/2">
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
            laudantium fuga laboriosam magni alias debitis, amet hic quo modi
            repellat libero quos molestias enim adipisci dolore repellendus
            molestiae distinctio unde?
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="w-full lg:w-1/3">
          <div className="bg-gray-900 space-y-5 p-3 rounded sidebar">
            <NavLink to="">
              <div
                className={
                  ["/", "/movie/create"].includes(pathname)
                    ? activeClasses
                    : inactiveClasses
                }
              >
                <h3 className="text-3xl font-bold">Movies</h3>
                <p>Do not wast your time with it!</p>
              </div>
            </NavLink>
            <NavLink to="/stream">
              <div
                className={
                  pathname === "/stream" ? activeClasses : inactiveClasses
                }
              >
                <h3 className="text-3xl font-bold">Stream Platform</h3>
                <p>Do not wast your time with it!</p>
              </div>
            </NavLink>
            <NavLink to="/reviews">
              <div
                className={
                  pathname === "/reviews" ? activeClasses : inactiveClasses
                }
              >
                <h3 className="text-3xl font-bold">Reviews</h3>
                <p>Do not wast your time with it!</p>
              </div>
            </NavLink>
          </div>
        </div>
        <div className="w-full lg:w-2/3">{props.children}</div>
      </div>
    </div>
  );
};

export default AppLayout;
