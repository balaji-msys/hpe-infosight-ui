import "./VmDashboard.css";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";

function createData(id, name, calories, fat, carbs, protein) {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

// const rows = [
//   createData(1, "Cupcake", 305, 3.7, 67, 4.3),
//   createData(2, "Donut", 452, 25.0, 51, 4.9),
//   createData(3, "Eclair", 262, 16.0, 24, 6.0),
//   createData(4, "Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData(5, "Gingerbread", 356, 16.0, 49, 3.9),
//   createData(6, "Honeycomb", 408, 3.2, 87, 6.5),
//   createData(7, "Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData(8, "Jelly Bean", 375, 0.0, 94, 0.0),
//   createData(9, "KitKat", 518, 26.0, 65, 7.0),
//   createData(10, "Lollipop", 392, 0.2, 98, 0.0),
//   createData(11, "Marshmallow", 318, 0, 81, 2.0),
//   createData(12, "Nougat", 360, 19.0, 9, 37.0),
//   createData(13, "Oreo", 437, 18.0, 63, 4.0),
// ];

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   console.log(order, orderBy, "order and orderby");
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// // Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// // stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// // only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// // with exampleArray.slice().sort(exampleComparator)
// function stableSort(array, comparator) {
//   console.log(array, "array");
//   console.log(comparator, "comparator");
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "host",
    numeric: false,
    disablePadding: false,
    label: "Host",
  },
  {
    id: "datastores",
    numeric: false,
    disablePadding: false,
    label: "Datastores",
  },
  {
    id: "array",
    numeric: false,
    disablePadding: false,
    label: "Array",
  },
  {
    id: "totalUsage",
    numeric: false,
    disablePadding: false,
    label: "Total Usage",
  },
  {
    id: "vcpu.average",
    numeric: true,
    disablePadding: false,
    label: "Average",
  },
  {
    id: "vcpu.peak",
    numeric: true,
    disablePadding: false,
    label: "Peak",
  },
  {
    id: "vmem.average",
    // numeric: false,
    disablePadding: false,
    label: "Average",
  },
  {
    id: "vmem.peak",
    // numeric: false,
    disablePadding: false,
    label: "Peak",
  },
  {
    id: "lastActivity",
    numeric: false,
    disablePadding: false,
    label: "Last Activity",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead style={{ borderBottom: "2px solid black" }}>
      <TableRow>
        
        {/* {headCells.map((headCell) =>
          headCell.numeric === true ? ( */}
        <TableCell colSpan={5}></TableCell>
        <TableCell colSpan={2} style={{ border: "1px solid black" }}>
          VCPU
        </TableCell>
        {/* ) : ( */}
        <TableCell colSpan={2} style={{ border: "1px solid black" }}>
          VMEM
        </TableCell>
        <TableCell colSpan={1} ></TableCell>
        {/*})
         )} */}
      </TableRow>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? "right" : "left"}
            // padding={headCell.disablePadding ? "none" : "normal"}
            // padding={"none"}
            sortDirection={orderBy === headCell.id ? order : false}
            className="tableHeader-row"
          >
            <TableSortLabel
              className={
                orderBy === headCell.id
                  ? "row-active"
                  : "tableHeader-row-active"
              }
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label.toUpperCase()}
              {/* {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null} */}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  // return (
  //   // <Toolbar
  //   //   sx={{
  //   //     pl: { sm: 2 },
  //   //     pr: { xs: 1, sm: 1 },
  //   //     ...(numSelected > 0 && {
  //   //       bgcolor: (theme) =>
  //   //         alpha(
  //   //           theme.palette.primary.main,
  //   //           theme.palette.action.activatedOpacity
  //   //         ),
  //   //     }),
  //   //   }}
  //   // >
  //   //   {/* {numSelected > 0 ? (
  //   //     <Typography
  //   //       sx={{ flex: "1 1 100%" }}
  //   //       color="inherit"
  //   //       variant="subtitle1"
  //   //       component="div"
  //   //     >
  //   //       {numSelected} selected
  //   //     </Typography>
  //   //   ) : (
  //   //     <Typography
  //   //       sx={{ flex: "1 1 100%" }}
  //   //       variant="h6"
  //   //       id="tableTitle"
  //   //       component="div"
  //   //     >
  //   //       Nutrition
  //   //     </Typography>
  //   //   )} */}

  //   //   {numSelected > 0 ? (
  //   //     <Tooltip title="Delete">
  //   //       <IconButton> <DeleteIcon /> </IconButton>
  //   //     </Tooltip>
  //   //   ) : (
  //   //     <Tooltip title="Filter list">
  //   //       <IconButton><FilterListIcon /></IconButton>
  //   //     </Tooltip>
  //   //   )}
  //   // </Toolbar>
  // );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export const VmDashboard = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/vm-list/list`)
      .then((res) => {
        console.log(res.data, "res");
        setRows(res?.data?.vmList);
      })
      .catch((err) => console.log(err, "err"));
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  function descendingComparator(a, b, orderBy) {
    // console.log(a, b, orderBy,"compare");
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    // console.log(order, orderBy, "order");
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
  // stableSort() brings sort stability to non-modern browsers (notably IE11). If you
  // only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
  // with exampleArray.slice().sort(exampleComparator)
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  const visibleRows = stableSort(rows, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  console.log(visibleRows, "visibleRows");
  return (
    <>
      <header className="header">Header</header>
      <div className="vmlist-container">
        <div className="vmlist-header">
          <button>Summary</button>
          <button>Performance</button>
        </div>
        <div className="vmlist-table">
          <Box
            sx={{ width: "100%" }}
            // style={{
            //   padding: "5px",
            // }}
          >
            <Paper sx={{ width: "100%", mb: 2 }}>
              <EnhancedTableToolbar numSelected={selected.length} />
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size={dense ? "small" : "medium"}
                  // style={{ fontSize: "15px" }}
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {visibleRows?.map((row, index) => {
                      const isItemSelected = isSelected(row._id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row._id}
                          selected={isItemSelected}
                          sx={{ cursor: "pointer" }}
                          style={{ fontSize: "15px" }}
                        >
                          <TableCell
                            component="th"
                            id={row._id}
                            scope="row"
                            // padding="none"
                            align="left"
                            className="tableRow-data"
                          >
                            {row.name}
                          </TableCell>
                          <TableCell align="left" className="tableRow-data">
                            {row.host}
                          </TableCell>
                          <TableCell align="left" className="tableRow-data">
                            {row.datastores}
                          </TableCell>
                          <TableCell align="left" className="tableRow-data">
                            {row.array}
                          </TableCell>
                          <TableCell align="right" className="tableRow-data">
                            {row.totalUsage}
                          </TableCell>
                          <TableCell align="right" className="tableRow-data">
                            {row.vcpu.average}
                          </TableCell>
                          <TableCell align="right" className="tableRow-data">
                            {row.vcpu.peak}
                          </TableCell>
                          <TableCell align="right" className="tableRow-data">
                            {row.vmem.average}
                          </TableCell>
                          <TableCell align="right" className="tableRow-data">
                            {row.vmem.peak}
                          </TableCell>
                          <TableCell align="left" className="tableRow-data">
                            {row.lastActivity}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: (dense ? 33 : 53) * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
            {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
          </Box>
        </div>
      </div>
    </>
  );
};
