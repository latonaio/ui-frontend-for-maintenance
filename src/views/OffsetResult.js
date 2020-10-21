import React from 'react'
import {Grid} from 'semantic-ui-react'
import Navbar from "../components/Navbar";
import Header from "../containers/AionHeader";
import Footer from "../components/Footer";
import WindowSizeListener from "react-window-size-listener";
import RobotHeader from "../containers/RobotHeader";

const ROBOT_FORM_LABEL = [
  {0: "正面", 1: "背面"},
  {0: "上方肘", 1: "下方肘"},
  {0: "フリップ", 1: "ノーフリップ"},
  {0: <p>&theta;R&lt;180</p>, 1: <p>&theta;R≧180</p>},
  {0: <p>&theta;T&lt;180</p>, 1: <p>&theta;T≧180</p>},
  {0: <p>&theta;S&lt;180</p>, 1: <p>&theta;S≧180</p>},
];

class OffsetResult extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      gridHeight: 800,
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);

    this.robotForm = this.robotForm.bind(this);
    this.props.getOffset();
  }

  robotForm(args) {
    if (args.index !== undefined && this.props.offset_result.data.RobotForm[args.index] !== null) {
      return ROBOT_FORM_LABEL[args.index][this.props.offset_result.data.RobotForm[args.index]]
    } else {
      return "";
    }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.props.getOffset(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div class="ui fluid container">
        <WindowSizeListener onResize={windowSize => {
          const gridHeight = windowSize.windowHeight - 130;
          this.setState({gridHeight: gridHeight});
        }}/>

        <Header title="補正結果"/>
        <Navbar/>

        <div className="main-contents">
          <RobotHeader pageName={"補正結果"} robotID={1} type={"controller"} command={'0x0075'}/>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={4} textAlign={"right"}>
                      動作シフト&nbsp;&#058;
                    </Grid.Column>
                    <Grid.Column width={4} textAlign={"center"}>
                      平行
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={4} textAlign={"right"}>
                      動作座標&nbsp;&#058;
                    </Grid.Column>
                    <Grid.Column width={4} textAlign={"center"}>
                      ベース
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={4} textAlign={"right"}>
                      X&nbsp;&#058;
                    </Grid.Column>
                    <Grid.Column width={4} textAlign={'right'}>
                      {this.props.offset_result.data.Axes01}
                    </Grid.Column>
                    <Grid.Column width={4} textAlign={'left'}>
                      mm
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={4} textAlign={"right"}>
                      Y&nbsp;&#058;
                    </Grid.Column>
                    <Grid.Column width={4} textAlign={'right'}>
                      {this.props.offset_result.data.Axes02}
                    </Grid.Column>
                    <Grid.Column width={4} textAlign={'left'}>
                      mm
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={4} textAlign={"right"}>
                      Z&nbsp;&#058;
                    </Grid.Column>
                    <Grid.Column width={4} textAlign={'right'}>
                      {this.props.offset_result.data.Axes03}
                    </Grid.Column>
                    <Grid.Column width={4} textAlign={'left'}>
                      mm
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={4} textAlign={"right"}>
                      Rx&nbsp;&#058;
                    </Grid.Column>
                    <Grid.Column width={4} textAlign={'right'}>
                      {this.props.offset_result.data.Axes04}
                    </Grid.Column>
                    <Grid.Column width={4} textAlign={'left'}>
                      deg.
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={4} textAlign={"right"}>
                      Ry&nbsp;&#058;
                    </Grid.Column>
                    <Grid.Column width={4} textAlign={'right'}>
                      {this.props.offset_result.data.Axes05}
                    </Grid.Column>
                    <Grid.Column width={4} textAlign={'left'}>
                      deg.
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={4} textAlign={"right"}>
                      Rz&nbsp;&#058;
                    </Grid.Column>
                    <Grid.Column width={4} textAlign={'right'}>
                      {this.props.offset_result.data.Axes06}
                    </Grid.Column>
                    <Grid.Column width={4} textAlign={'left'}>
                      deg.
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={4} textAlign={"right"}>
                      ビジョン車両No&nbsp;&#058;
                    </Grid.Column>
                    <Grid.Column width={4} textAlign={'right'}>
                      {/*TODO ビジョン車両Noの取得元*/}
                      {"XXXX"}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={4} textAlign={"left"}>
                      動作ツール&nbsp;&#058;
                    </Grid.Column>
                    <Grid.Column width={4} textAlign={"left"}>
                      {this.props.offset_result.data.ToolNo}
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={4} textAlign={"left"}>
                      形態
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={2}>
                      <this.robotForm index={0} textAlign={"left"}/>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <this.robotForm index={3} textAlign={"left"}/>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={2}>
                      <this.robotForm index={1} textAlign={"left"}/>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <this.robotForm index={4} textAlign={"left"}/>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={2}>
                      <this.robotForm index={2} textAlign={"left"}/>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <this.robotForm index={5} textAlign={"left"}/>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>

        <Footer/>
      </div>
    )
  }
}


export default OffsetResult;
