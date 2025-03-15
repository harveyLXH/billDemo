import classNames from 'classnames'

import './index.scss'

const TwoLineOverview = ({ yearResult }) => {
  return (
    <div className='twoLineOverview'>
        <div className="item">
            <span className="money">{ Math.abs(yearResult.pay).toFixed(2) }</span>
            <span className="type">支出</span>
        </div>
        <div className="item">
            <span className="money">{ yearResult.income.toFixed(2) }</span>
            <span className="type">收入</span>
        </div>
        <div className="item">
            <span className="money">{ yearResult.total.toFixed(2) }</span>
            <span className="type">结余</span>
        </div>
    </div>
  )
}

export default TwoLineOverview