import {SaccadesModule} from "@saccades";
import {ThemeModeToggle, ThemeProvider} from "@components";

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
            <div className="absolute top-4 right-4 z-10">
                <ThemeModeToggle />
            </div>
            <SaccadesModule/>
        </ThemeProvider>
    )
}

export default App