/* eslint-disable react/no-unescaped-entities */
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Nutrient from "../Nutrient/Nutrient";
import "./searchresults.css";

export default function SearchResultsList({ searchResults, onAdd }) {
  return (
    <ul className="search-results">
      {searchResults === null ? (
        // Render nothing or a placeholder if no search has been made
        <></>
      ) : searchResults.length > 0 ? (
        searchResults.map((result) => (
          <Nutrient onAdd={onAdd} key={result.name} searchResult={result} />
        ))
      ) : (
        // Render the error message if searchResults is an empty array
        <ErrorMessage>
          Sorry! We've been searching the pantry, but couldn't find what you're
          looking for.
        </ErrorMessage>
      )}
    </ul>
  );
}
