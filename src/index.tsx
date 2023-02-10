import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Main from "@pages/main/Main";
import { PreMain } from "@pages/pre-main";
import { RoadmapWidget } from "@widgets/roadmap";
import { UserGroupWidget } from "@widgets/UserGroup";
import { ExpertsWidget } from "@widgets/ExpertsWidget";
import { CuratorsWidget } from "@widgets/CuratorsWidget";

import Modal from "@features/Modal/containers/ModalContainer";
import { RatePage } from "@pages/rates";
import { PrivatePage } from "@pages/private";

import store from "@shared/api/store";
import "./app/index.scss";
import Lib from './pages/lib/Lib';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/view_doc.html?mode=komus_talents"
            element={
              <PrivatePage>
                <Main />
              </PrivatePage>
            }
          />
          <Route path="/komus_talents/pre" element={<PreMain />} />
          <Route
            path="/komus_talents"
            element={
              <PrivatePage>
                <Main />
              </PrivatePage>
            }
          />
          <Route
            path="/komus_talents/rates"
            element={
              <PrivatePage>
                <RatePage />
              </PrivatePage>
            }
          />
          <Route
            path="/komus_talents/roadmap"
            element={
              <PrivatePage>
                <RoadmapWidget />
              </PrivatePage>
            }
          />
          <Route
            path="/komus_talents/group"
            element={
              <PrivatePage>
                <UserGroupWidget />
              </PrivatePage>
            }
          />
          <Route
            path="/komus_talents/experts"
            element={
              <PrivatePage>
                <ExpertsWidget />
              </PrivatePage>
            }
          />
          <Route
            path="/komus_talents/curators"
            element={
              <PrivatePage>
                <CuratorsWidget />
              </PrivatePage>
            }
          />
          <Route
            path="/komus_talents/lib"
            element={
              <PrivatePage>
                <Lib />
              </PrivatePage>
            }
          />
          <Route
            path="*"
            element={<div className="not-found">Страницы не существует</div>}
          />
        </Routes>
      </BrowserRouter>
      <Modal />
    </Provider>
  );
};

ReactDom.render(<App />, document.getElementById("komus-talents"));
