'use client';
import React from "react";
import CartProductItem from "@/components/client/shoppingCart/cartProductItem";
import { fetchArticlesPaginationFilter } from "@/services/ArticleService";
import TablePagination from '@mui/material/TablePagination';

async function getProducts(page, rowsPerPage, searchTerm, prixMax) {
  page++; // Incrémentation de la page
  const data = await fetchArticlesPaginationFilter(page, rowsPerPage, searchTerm, prixMax);
  return data;
}

const CartProductsWithPaginationPage = () => {
  const [products, setProducts] = React.useState([]);
  const [tot, setTot] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [prixMax, setPrixMax] = React.useState('');
  const [maxValuePrix, setMaxValuePrix] = React.useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    getProducts(page, rowsPerPage, searchTerm, prixMax)
      .then((res) => {
        setTot(res.tot);
        setProducts(res.articles);
        setMaxValuePrix(res.maxValuePrix);
      });
  }, [page, rowsPerPage, searchTerm, prixMax]);

  return (
    <div className="row">
      <div className="col-sm-3 mt-5">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">Filtre Désignation</span>
          </div>
          <input
            type="text"
            className="form-control"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon2">Prix Max {prixMax} </span>
          </div>
          <input
            type="range"
            className="form-range"
            min="0"
            max={maxValuePrix}
            step="1"
            value={prixMax}
            onChange={(event) => setPrixMax(event.target.value)}
          />
        </div>
      </div>
      <div className="col-sm">
        <div className="row">
          {products && products.map((product) => (
            <CartProductItem key={product?._id} product={product} />
          ))}
        </div>
        <div style={{ "display": "flex", "justifyContent": "center" }}>
          <TablePagination
            component="div"
            count={tot}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default CartProductsWithPaginationPage;