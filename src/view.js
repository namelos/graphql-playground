import { hJSX } from '@cycle/dom'

const divider = <p>----------------------</p>
const boldDivider = <p>**********************</p>

const renderList = list =>
  list.map(({ category, quantity, price, unit, subtotal }) =>
    <li>名称: { category }，数量：{ quantity }{ unit }，单价：{ price }(元)，小计：{ subtotal }(元)</li>)

const renderHeader = list => <header>
  <p>***&lt;没钱赚商店&gt;购物清单***</p>
  <ul>
    { renderList(list) }
  </ul>
  { divider }
</header>

const renderBonusList = bonus =>
  bonus.map(({ category, quantity, unit}) =>
    <li>名称：{ category }，数量：{ quantity }{ unit }</li>)

const renderBonus = bonus => <section>
  <p>买二赠一商品：</p>
  <ul>
    { renderBonusList(bonus) }
  </ul>
  { divider }
</section>

const renderFooter = ({ total, saved }) => <footer>
  <p>总计：{ total }(元)</p>
  { do { if (saved) <p>节省：{ saved }(元)</p> } }
  { boldDivider }
</footer>

export default state$ =>
  state$.map(({ list, bonus, ...rest }) =>
    <div>
      { renderHeader(list) }
      { do { if(bonus) renderBonus(bonus) } }
      { renderFooter(rest) }
    </div>)
