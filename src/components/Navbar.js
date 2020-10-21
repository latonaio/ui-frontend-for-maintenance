import React from 'react'
import {NavLink} from 'react-router-dom'
import {Menu} from 'semantic-ui-react'

class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <Menu text vertical borderless compact>
          <Menu.Item>
            <Menu.Item fitted={"vertically"} header>Yaskawa</Menu.Item>
            <Menu.Item fitted={"vertically"} content={<NavLink to="/Yaskawa/TimeChart" exact>タイムチャートデータ収集</NavLink>}/>
            <Menu.Item fitted={"vertically"} content={<NavLink to="/Yaskawa/WaveChart" exact>波形データ収集</NavLink>}/>
            <Menu.Item fitted={"vertically"}
                       content={<NavLink to="/Yaskawa/DataBackup/" exact>ロボット全データバックアップ</NavLink>}/>
            <Menu.Item fitted={"vertically"} content={<NavLink to="/Yaskawa/Alarm" exact>異常履歴</NavLink>}/>
            <Menu.Item fitted={"vertically"} content={<NavLink to="/Yaskawa/EventLog" exact>イベントログ</NavLink>}/>
            <Menu.Item fitted={"vertically"} content={<NavLink to="/Yaskawa/OffsetResult" exact>補正結果</NavLink>}/>
            <Menu.Item fitted={"vertically"} content={<NavLink to="/Yaskawa/OperationTime" exact>稼働時間</NavLink>}/>
            <Menu.Item fitted={"vertically"}
                       content={<NavLink to="/Yaskawa/SoftwareVersion" exact>ソフトウェアバージョン</NavLink>}/>
            <Menu.Item fitted={"vertically"} content={<NavLink to="/Yaskawa/JobScheduler" exact>ジョブスケジューラ</NavLink>}/>
          </Menu.Item>
          <Menu.Item>
            <Menu.Item fitted={"vertically"} header>JTEKT</Menu.Item>
            <Menu.Item fitted={"vertically"} content={"異常履歴"}/>
          </Menu.Item>
          <Menu.Item>
            <Menu.Item fitted={"vertically"} header>OMRON</Menu.Item>
            <Menu.Item fitted={"vertically"} content={"ロボット全データバックアップ"}/>
            <Menu.Item fitted={"vertically"} content={"ジョブスケジューラ"}/>
          </Menu.Item>
          <Menu.Item>
            <Menu.Item fitted={"vertically"} header>Mitsubishi</Menu.Item>
            <Menu.Item fitted={"vertically"} content={"ロボット全データバックアップ"}/>
            <Menu.Item fitted={"vertically"} content={"ジョブスケジューラ"}/>
          </Menu.Item>
          {/*<Menu.Item>*/}
          {/*  <Menu.Item fitted={"vertically"} header>JTEKT</Menu.Item>*/}
          {/*  <Menu.Item fitted={"vertically"} content={<NavLink to="/Jtekt/Alarm" exact>異常履歴</NavLink>}/>*/}
          {/*</Menu.Item>*/}
          {/*<Menu.Item>*/}
          {/*  <Menu.Item fitted={"vertically"} header>OMRON</Menu.Item>*/}
          {/*  <Menu.Item fitted={"vertically"} content={<NavLink to="/Omron/DataBackup" exact>ロボット全データバックアップ</NavLink>}/>*/}
          {/*  <Menu.Item fitted={"vertically"} content={<NavLink to="/Omron/JobScheduler" exact>ジョブスケジューラ</NavLink>}/>*/}
          {/*</Menu.Item>*/}
          {/*<Menu.Item>*/}
          {/*  <Menu.Item fitted={"vertically"} header>Mitsubishi</Menu.Item>*/}
          {/*  <Menu.Item fitted={"vertically"} content={<NavLink to="/Mitsubishi/DataBackup" exact>ロボット全データバックアップ</NavLink>}/>*/}
          {/*  <Menu.Item fitted={"vertically"}*/}
          {/*             content={<NavLink to="/Mitsubishi/JobScheduler" exact>ジョブスケジューラ</NavLink>}/>*/}
          {/*</Menu.Item>*/}
          <Menu.Item>
            <Menu.Item fitted={"vertically"} header>接続機器</Menu.Item>
            <Menu.Item fitted={"vertically"}
                       content={<NavLink to="/ConnectionStatus" exact>Connection Status</NavLink>}/>
          </Menu.Item>
        </Menu>
      </nav>
    )
  }
}

export default Navbar;
