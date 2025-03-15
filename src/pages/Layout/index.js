import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getBillList } from "@/store/modules/billStore"

import { TabBar } from "antd-mobile"
import { BillOutline, CalculatorOutline, AddCircleOutline } from "antd-mobile-icons"

import "./index.scss"

const tabs = [
  {
    key: "/month",
    title: "月度账单",
    icon: <BillOutline />,
  },
  {
    key: "/new",
    title: "记账",
    icon: <AddCircleOutline />,
  },
  {
    key: "/year",
    title: "年度账单",
    icon: <CalculatorOutline />,
  },
]

const Layout = () => {
  const dispath = useDispatch()

  useEffect(() => {
    dispath(getBillList())
  }, [dispath])

  // 切换菜单跳转路由
  const navigate = useNavigate()
  const switchRoute = path => {
    // console.log(path)
    navigate(path)
  }

  return (
    <div className="layout">
      <div className="container">
        <Outlet />
      </div>
      <div className="footer">
        <TabBar onChange={switchRoute}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  )
}

export default Layout
