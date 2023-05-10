import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Helmet } from "react-helmet"
import Daily from "./daily/daily"
import Unlimited from "./unlimited/unlimited"
import Navigation from "../components/Navigation";




const Router = () => {


    return (
        <>
            <Helmet>
                <title>Swifti.es</title>
            </Helmet>
            <BrowserRouter>
                <div className="mx-auto max-w-[1010px] px-3">
                    <Navigation></Navigation>
                    <main className="mb-2 min-h-[calc(100vh-177px)] sm:min-h-[calc(100vh-77px)]">
                        <Routes>
                            <Route path="*" element={<Navigate replace to="/daily" />}></Route>
                            <Route exact path='/daily' element={<Daily></Daily>}></Route>
                            <Route exact path='/unlimited' element={<Unlimited ></Unlimited>}></Route>
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
        </>
    )

}



export default Router