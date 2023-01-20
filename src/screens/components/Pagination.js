import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import { loading } from "../../store/modules/auth/auth.action";
import Loader from "../../Loader";
const Pagination = ({ nPages, currentPage, setCurrentPage, apiCall }) => {
  let pageNumbers;
  console.log(nPages);
  try {
    pageNumbers = [...Array(nPages + 1).keys()].slice(1);
  } catch {
    pageNumbers = [];
  }

  const nextPage = () => {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1);
      apiCall(currentPage + 1)
        .then((res) => {
          console.log("Fetched");
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      apiCall(currentPage - 1)
        .then((res) => {
          console.log("Fetched");
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  return (
    <>
      <Loader />

      <nav>
        <ul className="pagination justify-content-center">
          {currentPage != 1 && (
            <li className="page-item">
              <a className="page-link" onClick={prevPage} href="#">
                Previous
              </a>
            </li>
          )}
          {pageNumbers.map((pgNumber) => (
            <li
              key={pgNumber}
              className={`page-item ${
                currentPage == pgNumber ? "page-item-active" : ""
              } `}
            >
              <a
                onClick={() => {
                  setCurrentPage(pgNumber);
                  console.log("Queries Called", pgNumber);
                  apiCall(pgNumber);
                }}
                className="page-link"
                href="#"
              >
                {pgNumber}
              </a>
            </li>
          ))}
          {currentPage != nPages && nPages != 0 && (
            <li className="page-item">
              <a className="page-link" onClick={nextPage} href="#">
                Next
              </a>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
