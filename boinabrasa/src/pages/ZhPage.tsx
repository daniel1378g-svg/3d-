// 中文: the live site's page for Chinese-speaking groups, reproduced as it is (Traditional Chinese). It sits outside
// the five-language system, as on the live site, and links to the German/English booking and group forms.
import { useEffect } from "react";
import { BOOKING_BASE, EMAIL, PHONE, PRICES, URLS } from "@/content/facts";
import { PROPOSAL, PROPOSAL_TEXT } from "@/site";
import { asset } from "@/lib/utils";

export function ZhPage() {
  useEffect(() => {
    document.documentElement.lang = "zh-Hant";
    document.title = "歡迎光臨 Boinabrasa｜巴西烤肉吃到飽";
  }, []);
  const back = __ARTIFACT__ ? "#de" : "/de/";
  return (
    <div className="min-h-screen bg-carvao text-creme" lang="zh-Hant">
      {PROPOSAL && <p className="proposal-label" role="note" lang="pt-PT">{PROPOSAL_TEXT}</p>}
      <div className="gutter py-10">
        <div className="mx-auto max-w-[760px]">
          <a href={back} className="inline-block"><img src={asset("/brand/logo.webp")} alt="Boinabrasa" width={500} height={123} className="w-[180px]" /></a>
          <h1 className="mt-10 text-[2.2rem] font-bold leading-tight">歡迎光臨 BOINABRASA｜巴西烤肉吃到飽</h1>
          <p className="mt-5 leading-relaxed text-creme/85">歡迎來到 Boinabrasa！我們位於 Dielsdorf，鄰近蘇黎世機場，提供巴西烤肉吃到飽（Churrasco à discrétion）。現烤美味由服務人員直接送到桌邊，為您切片享用。無論是兩人約會、與家人朋友聚餐，還是團體出遊，都歡迎您來享用。</p>
          <h2 className="mt-10 text-[1.5rem] font-bold text-ouro">專為團體聚餐與旅遊團服務</h2>
          <p className="mt-3">抵達即可開始用餐，輕鬆安排您的行程。</p>
          <p className="mt-3 leading-relaxed text-creme/85">我們熟悉旅遊團、公司聚餐與大型團體的接待需求。請事先預約並確認抵達時間，讓我們為您的團體做好準備。抵達後即可享用自助餐，烤肉則由服務人員陸續送到桌邊。</p>
          <ul className="mt-4 list-disc pl-6 text-creme/85"><li>可接待多達 150 位賓客</li><li>超過 80 個免費專用停車位</li><li>設有遊覽車（旅遊巴士）停車空間</li><li>公司消費可開立帳單付款</li></ul>
          <p className="mt-4">我們也提供包含飲料的團體套餐。<br />歡迎聯絡我們，了解套餐內容，並為您的旅遊團或公司聚餐選擇合適的方案。</p>
          <p className="mt-4"><a className="pill" href={__ARTIFACT__ ? "#en/groups" : "/en/groups"}>團體預約與詢價（英文表格）</a></p>
          <p className="mt-4">您也可以透過電子郵件聯絡我們：<a className="link-u" href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
          <h2 className="mt-10 text-[1.5rem] font-bold text-ouro">如何享用巴西烤肉</h2>
          <ol className="mt-3 flex flex-col gap-3 text-creme/85"><li><strong>1. 先享用自助餐</strong><br />自由選取冷熱配菜及沙拉。</li><li><strong>2. 桌邊烤肉服務</strong><br />服務人員將現烤串肉帶到桌邊，直接為您切片。您可品嚐多達 10 種不同的燒烤美味。</li><li><strong>3. 按自己的步調享用</strong><br />喜歡的口味可以繼續享用，也可以隨時休息。</li></ol>
          <h2 className="mt-10 text-[1.5rem] font-bold text-ouro">餐點價格</h2>
          <ul className="mt-3 flex flex-col gap-1 text-creme/85"><li>成人烤肉吃到飽：CHF {PRICES.adult}.–／位</li><li>0–5 歲兒童：免費</li><li>6–12 歲兒童：CHF {PRICES.kids6to12}.–／位</li><li>僅享用自助餐（不含桌邊烤肉）：CHF {PRICES.buffetOnly}.–／位</li></ul>
          <p className="mt-3 text-sm text-creme/70">烤肉吃到飽已包含自助餐。飲料與甜點另計。價格以瑞士法郎計算，已含增值稅。特殊活動價格請另行確認。</p>
          <p className="mt-3"><a className="link-u" href={URLS.menuPdf} target="_blank" rel="noopener">完整菜單與飲料單（PDF）</a></p>
          <h2 className="mt-10 text-[1.5rem] font-bold text-ouro">過敏原與飲食需求</h2>
          <p className="mt-3 text-creme/85">如有食物過敏、食物不耐受或特殊飲食需求，請在預約時告知，並於用餐前再次向現場服務人員確認。</p>
          <p className="mt-3"><a className="link-u" href={URLS.allergensPdf} target="_blank" rel="noopener">查看過敏原資訊（PDF）</a></p>
          <h2 className="mt-10 text-[1.5rem] font-bold text-ouro">營業時間與交通</h2>
          <p className="mt-3 text-creme/85">週一至週三：休息<br />週四至週六：18:00–23:00<br />週日：12:30–16:00、18:00–22:00</p>
          <p className="mt-4 text-creme/85">Boinabrasa<br />Honeywell-Platz 1, 8157 Dielsdorf, Switzerland<br />電話：<a className="link-u" href={PHONE.href}>{PHONE.intl}</a><br />電子郵件：<a className="link-u" href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
          <p className="mt-6"><a className="pill" href={BOOKING_BASE.en} target="_blank" rel="noopener">線上訂位（英文）</a></p>
          <p className="mt-3 text-sm text-creme/60">訂位系統及團體表格目前尚未提供中文介面。</p>
          <p className="mt-12"><a className="link-u text-creme/70" href={back}>Deutsch · English · Português · Français · Italiano</a></p>
        </div>
      </div>
    </div>
  );
}
