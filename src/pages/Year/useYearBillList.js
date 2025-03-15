import { useState, useMemo, useEffect } from "react"
import { useSelector } from "react-redux"
import dayjs from "dayjs"
export const useYearBillList = () => {
  // 控制年份选择
  const [visible, setVisible] = useState(false)

  // 选择的年份
  const [date, setDate] = useState(dayjs(new Date()).format("YYYY"))
  const onShowDate = () => {
    setVisible(true)
  }
  const onHideDate = () => {
    setVisible(false)
  }

  const onDateChange = value => {
    setDate(dayjs(value).format("YYYY"))
    setYearBillList(yearGroup[dayjs(value).format("YYYY")])
    setVisible(false)
  }

  function groupBy(array, iteratee) {
    const result = {}
    array.forEach(item => {
      const key = typeof iteratee === "function" ? iteratee(item) : item[iteratee]
      if (!result.hasOwnProperty(key)) {
        result[key] = []
      }
      result[key].push(item)
    })
    return result
  }

  const { billList } = useSelector(state => state.bill)

  // 按年分组
  const yearGroup = useMemo(() => {
    return groupBy(billList, item => dayjs(item.date).format("YYYY"))
  }, [billList])
  console.log(yearGroup)

  const [yearBillList, setYearBillList] = useState([])

  // 初始化将数据统计出来
  useEffect(() => {
    const nowDate = dayjs(new Date()).format("YYYY")
    if (yearGroup[nowDate]) {
      setYearBillList(yearGroup[nowDate])
    }
  }, [yearGroup])

  // 按年统计
  const yearResult = useMemo(() => {
    const pay = yearBillList.filter(item => item.type === "pay").reduce((a, c) => a + c.money, 0)
    const income = yearBillList
      .filter(item => item.type === "income")
      .reduce((a, c) => a + c.money, 0)
    return {
      pay,
      income,
      total: pay + income,
    }
  }, [yearBillList])

  // 按月分组
  const monthGroup = useMemo(() => {
    return groupBy(yearBillList, item => dayjs(item.date).format("YYYY-MM"))
  }, [yearBillList])

  const maxMonth = date == dayjs().get("year") ? dayjs().get("month") + 1 : 12
  // 按月统计
  const getMonthResult = () => {
    return new Array(maxMonth)
      .fill("")
      .map((_, index) => {
        let month = index + 1 > 9 ? `${date}-${index + 1}` : `${date}-0${index + 1}`
        return {
          pay:
            monthGroup[month]
              ?.filter(item => item.type === "pay")
              .reduce((a, c) => a + c.money, 0) || 0,
          income:
            monthGroup[month]
              ?.filter(item => item.type === "income")
              .reduce((a, c) => a + c.money, 0) || 0,
          month: month,
        }
      })
      .reverse()
  }

  return {
    date,
    visible,
    onShowDate,
    onHideDate,
    onDateChange,
    yearResult,
    getMonthResult,
  }
}
