import { useEffect } from "react";

// make API calls and pass the returned data via dispatch

var myHeaders = new Headers();
myHeaders.append("X-Best-Pokemon", "kangaskhan");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};
export const useFetch = (data, dispatch) => {
  useEffect(() => {
    dispatch({ type: "FETCHING_BREACHES", fetching: true });
    fetch(
      `https://guard.io/v2/hiring/fe/breaches?offset=${data.page}`,
      requestOptions
    )
      .then((data) => data.json())
      .then((breaches) => {
        const items = breaches.items;
        // console.log(items);
        dispatch({ type: "STACK_BREACHES", breaches: items });
        dispatch({ type: "FETCHING_BREACHES", fetching: false });
      })
      .catch((e) => {
        // handle error
        dispatch({ type: "FETCHING_BREACHES", fetching: false });
        return e;
      });
  }, [dispatch, data.page]);
};
