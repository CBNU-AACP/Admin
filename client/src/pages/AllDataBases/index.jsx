import DataBases from "../../components/DbCardList";
import Footer from "../../components/Footer";
import "./style.scss";

export default function AllDataBases() {
  return (
    <div className="dbPage">
      <div className="groupTitle">모든 데이터베이스</div>
      <main className="main">
        <DataBases className="cardList" />
      </main>
      <Footer />
    </div>
  );
}
