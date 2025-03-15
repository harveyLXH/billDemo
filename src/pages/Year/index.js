import { DatePicker, NavBar } from "antd-mobile"
import classNames from "classnames"
import "./index.scss"
import TwoLineOverview from "@/components/TwoLineOverview"
import OneLineOverview from "@/components/OneLineOverview"
import { useYearBillList } from "./useYearBillList"
const Year = () => {
  const { date, visible, onShowDate, onHideDate, onDateChange, yearResult, getMonthResult } =
    useYearBillList()

  return (
    <div className="billDetail">
      <NavBar className="nav" backArrow={false}>
        <div className="nav-title" onClick={onShowDate}>
          {date}年<span className={classNames("arrow", visible && "expand")}></span>
        </div>
      </NavBar>
      <DatePicker
        className="kaDate"
        title="记账日期"
        precision="year"
        visible={visible}
        onConfirm={onDateChange}
        max={new Date()}
        onCancel={onHideDate}
      />

      <div className="content">
        <div className="overview">
          {/* 年度统计区域 */}
          <TwoLineOverview yearResult={yearResult} />
        </div>
        {/* 月份账单 */}
        {getMonthResult().map(item => {
          return (
            <div className="monthBill" key={item.month}>
              <div className="date">{item.month}月</div>
              <OneLineOverview pay={item.pay} income={item.income} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Year
