import "../../styles/reviews.css"
import { AgGridReact } from "ag-grid-react"

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import { useMemo, useState } from "react"


const ReviewsPage = () => {
    const [rowData, /* setRowData */] = useState([
        { id: "", number: "1", doctorName: "", doctorSpeciality: "", provideReview: "", reviewGiven: "" }
    ])

    // console.log("rowData", rowData);


    // const [colDef, setColDef] = useState([

    // ])

    const renderCellButton = () => () => (
        <button>Give Review</button>
    )

    const columnDataTable = useMemo(() => [
        { headerName: "ID", field: "id", flex: 1, hide: true },
        { headerName: "№", field: "number", flex: 1 },
        { headerName: "Doctor Name", field: "doctorName", flex: 2, },
        { headerName: "Doctor Speciality", field: "doctorSpeciality", flex: 2 },
        { headerName: "Provide Review", field: "provideReview", cellRenderer: renderCellButton(), flex: 2 },
        { headerName: "Review Given", field: "reviewGiven", flex: 2 }
    ], [])

    // console.log("columnDataTable", columnDataTable);

    const defaultColDef = useMemo(() => {
        return {
            filter: 'agTextColumnFilter',
            floatingFilter: true,
        };
    }, []);

    return (
        <div className="reviewsPage_container">
            <div className={"ag-theme-quartz-dark"} /* style={{ height: 360, width: "90%", margin: 30 }} */>
                {/* <h1> Hello from ReviewsPage </h1> */}
                <AgGridReact
                    // defaultColDef={{ sortable: true, filter: true }}
                    defaultColDef={defaultColDef}
                    rowSelection="multiple"
                    suppressRowClickSelection={true}
                    rowData={rowData}
                    columnDefs={columnDataTable}
                >
                </AgGridReact>
            </div>
        </div>
    );
}

export default ReviewsPage;