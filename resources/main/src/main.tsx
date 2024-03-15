import "@/scss/layout/index.scss";

import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/app/App";
import { ErrorBoundary } from "@/app/providers/ErrorBoundary";
import StoreProvider from "@/app/providers/StoreProvider/ui/StoreProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<ErrorBoundary>
		<StoreProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</StoreProvider>
	</ErrorBoundary>,
);
