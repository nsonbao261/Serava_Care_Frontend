import React, {PropsWithChildren} from "react";
import {Sidebar} from "lucide-react";

export default (({children}) => (
    <>
        <Sidebar/>
        {children}
    </>
)) satisfies React.FC<PropsWithChildren>
