import { Link } from "react-router-dom";
import "../style/notPage.scss";

function Not() {
  return (
    <div className="notPage">
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center ">Not Photo</h1>
                </div>

                <div className="contant_box_404">
                  <h3 className="h2">Postlar topilmadi</h3>

                  <p>Sizning postlaringiz yuq</p>

                  <Link to="/post" className="link_404 btn">
                    Post qo'shish
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Not;
