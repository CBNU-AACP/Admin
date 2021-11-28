import "./style.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="introCorp">
        <p className="cmName">출결 관리 플랫폼</p>
        <a href="/" className="cmLink">
          Check Mate
        </a>
      </div>
      <p className="corp">ⒸCheck Mate Corp.</p>
    </footer>
  );
}
