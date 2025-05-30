import "./output.css"; // Import global styles
import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import SearchForm from "./components/SearchForm.jsx";
import Footer from "./components/Footer.jsx";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MousePointer2 } from "lucide-react";

/*UI components*/
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

function App() {
  const navigate = useNavigate();
  const [responseData, setResponseData] = useState(null);
  const [isRendered, setIsRendered] = useState(false);
  const [theme, setTheme] = useState("dark"); // Default to dark mode
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [value, setValue] = useState("0");

  useEffect(() => {
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem("theme");
    console.log(`${savedTheme} mode is currently on`);
    if (savedTheme) {
      setTheme(savedTheme);
    }
    setIsRendered(true);
  }, []);

  //Once data is fetched, redirect to first array of data
  //(and disable loading animation)
  useEffect(() => {
    if (responseData) {
      navigate("/0");
    }
  }, [responseData]);

  const handleLinkChange = (e) => {
    //handles option changes, modifies URL based on selected option
    if (e) {
      setValue(e);
      navigate(e); //triggers re-render of Data component as it's dependent on dynamic parameter of :index
    }
  };

  /*The theme can be manipulated using state.. 
  but effects are necessary to directly change the DOM 
  depending on dark/light mode
  
  Changes in state will rerender the whole app, while 
  changes in effect are dependent upon the parameters in the 
  dep. array
  */
  useEffect(() => {
    // Apply theme class to root element
    document.documentElement.classList.remove(
      theme === "dark" ? "light" : "dark",
    );
    document.documentElement.classList.add(theme);

    // Save theme to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div className={`App box-border`}>
      <Header
        toggleTheme={toggleTheme}
        currentTheme={theme}
        className={`header transition-opacity duration-500 delay-100 ${
          isRendered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
      />
      <div className="container">
        <main className={`main-content w-screen`}>
          <SearchForm
            setResponseData={setResponseData}
            loading={loading}
            setLoading={setLoading}
            setError={setError}
            className={`transition-opacity duration-1000 delay-200 ${
              isRendered
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }`}
          />
          {loading && (
            <div className="flex flex-wrap gap-16 items-center justify-center ">
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[250px] xl:w-[800px] lg:w-[450px] md:w-[500px] sm:w-[350px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[350px]" />
                  <Skeleton className="h-4 w-[300px]" />
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[250px] xl:w-[800px] lg:w-[450px]  md:w-[500px] sm:w-[350px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[350px]" />
                  <Skeleton className="h-4 w-[300px]" />
                </div>
              </div>
            </div>
          )}

          {responseData && !loading && (
            <>
              <div className="w-screen">
                <Select value={value} onValueChange={handleLinkChange}>
                  <SelectTrigger className="w-3/12 ml-4">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {responseData.intersect &&
                      responseData.data.map((arr, index) => {
                        if (index == responseData.data.length - 1) {
                          return (
                            <SelectItem key={index} value={`${index}`}>
                              All
                            </SelectItem>
                          );
                        }
                        return (
                          <SelectItem key={index} value={`${index}`}>
                            Subject: {arr[0]["reason"].replace(/[\[\]]/g, "")}
                          </SelectItem>
                        );
                      })}
                    {!responseData.intersect &&
                      responseData.data.map((arr, index) => {
                        if (index == responseData.data.length - 1) {
                          return (
                            <SelectItem key={index} value={`${index}`}>
                              All
                            </SelectItem>
                          );
                        }
                        if (
                          index + 1 > responseData.subjectSplit ||
                          responseData.subjectSplit === 1
                        ) {
                          return (
                            <SelectItem key={index} value={`${index}`}>
                              Owner: {arr[0]["name"]}
                            </SelectItem>
                          );
                        } else {
                          console.log(responseData.subjectSplit);
                          return (
                            <SelectItem key={index} value={`${index}`}>
                              Subject: {arr[0]["reason"].replace(/[\[\]]/g, "")}
                            </SelectItem>
                          );
                        }
                      })}
                  </SelectContent>
                </Select>
                {<Outlet context={[responseData.data]} />}
              </div>
            </>
          )}
          {error && <p>{error}.</p>}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
