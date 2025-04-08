import PathParameters from "./PathParameters";
import QueryParameters from "./QueryParameter";
import WorkingWithObjects from "./WorkingWithObjects";
import WorkingWithArrays from "./WorkingWithArrays";
import EnvironmentVariables from "./EnvironmentVariables";
import { Link } from "react-router-dom";
import HttpClient from "./HttpClient";
import WorkingWithObjectsAsynchronously from "./WorkingWithObjectsAsychronously";
import WorkingWithArraysAsynchronously from "./WorkingWithArraysAsychronously";

export default function Lab5() {
  return (
    <div id="wd-lab5">
      <h2>Lab 5</h2>
      <div className="list-group">
        <Link to="welcome" className="list-group-item">
          Welcome
        </Link>
      </div>
      <hr />
      <EnvironmentVariables />
      <PathParameters />
      <QueryParameters />
      <WorkingWithObjects />
      <WorkingWithArrays />
      <HttpClient />
      <WorkingWithObjectsAsynchronously />
      <WorkingWithArraysAsynchronously />
    </div>
  );
}
