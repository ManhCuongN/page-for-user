import React from "react";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBBtn,
} from "mdb-react-ui-kit";
import ReactRoundedImage from "react-rounded-image";
import CustomInput from "./CustomInput";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
export default function DropdownUser() {
  return (
    <>
      <button
        className="button border-0"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        type="button"
      >
        Add to Cart
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header py-0 border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-0">
              <div className="d-flex align-items-center">
                <form
                  action=""
                  className="d-flex gap-15 flex-wrap justify-content-between"
                >
                  <div className="w-100">
                    <select name="" className="form-control form-select" id="">
                      <option value="" selected disabled>
                        Select Country
                      </option>
                    </select>
                  </div>
                  <div className="flex-grow-1">
                  <CustomInput type="text" name="givenName" placeholder="Given Name"  />
                  </div>
                  <div className="flex-grow-1">
                  <CustomInput type="text" name="familyName" placeholder="Family Name"  />
                  </div>
                  <div className="w-100">
                 
                  </div>
                  <div className="w-100">
                  <CustomInput type="text" name="note" placeholder="Address Details...."  />
                  </div>
                  <div className="flex-grow-1">
                    <select name="" className="form-control form-select" id="">
                      <option value="" selected disabled>
                        Select State
                      </option>
                    </select>
                  </div>
                  <div className="flex-grow-1">
                    <select name="" className="form-control form-select" id="">
                      <option value="" selected disabled>
                        Select State
                      </option>
                    </select>
                  </div>
                  <div className="flex-grow-1">
                    <CustomInput type="text" name="phone" placeholder="Number Phone...."  />
                  </div>
                </form>
              </div>
            </div><br/>
            <div className="modal-footer border-0 py-0 justify-content-center gap-30">
              <button type="button" className="button" data-bs-dismiss="modal">
               Cancel
              </button>
              <button type="button" className="button signup">
                Save
              </button>
            </div>
            <div className="d-flex justify-content-center py-3">
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
