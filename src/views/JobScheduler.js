import React from "react";
import Header from "../containers/AionHeader";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import RobotHeader from "../containers/RobotHeader";
import {DayOptions, MinutesOptions, TimeOptions, WeekOptions,} from "../helpers/dates-helper";

import {Button, Checkbox, Grid, Icon, List, Select} from "semantic-ui-react";
import WindowSizeListener from "react-window-size-listener";
import {DateInput} from 'semantic-ui-calendar-react';

let today = new Date();
today = today.toISOString().split('T')[0];

const initialState = {
  showSetting: null,
  showDay: false,
  showWeek: false,
  repeatType: null,
  repeatDate: null,
  repeatWeekDay: null,
  repeatHour: 0,
  repeatMinute: 0,
  startDate: null,
  editing: false,
};

class JobScheduler extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      gridHeight: 800,
      tableBodyHeight: 500,
      ...initialState,
    };
    this.props.initJobScheduler();
    this.props.getJobSchedule(this.props.makerID);
  }

  initJobScheduler() {
    this.props.initJobScheduler();
    this.setState({showSetting: null});
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.makerID !== prevProps.makerID) {
      // 別のメーカーIDになったら別画面扱い
      this.props.initJobScheduler();
      this.props.getJobSchedule(this.props.makerID);
      this.setState(initialState);
    } else if (this.props.result !== prevProps.result) {
      this.props.initJobScheduler();
      this.props.getJobSchedule(this.props.makerID);
      this.setState({showSetting: null, editing: false});
      alert("更新が完了しました。");
    }
  }

  getMachineList = (jobID) => {
    this.props.getMachineData(jobID);
  }

  handleShowSetting = (idx, jobID) => {
    this.setState({showSetting: idx})
    this.getMachineList(jobID);
  }

  getWeekDay = (i) => {
    switch (i) {
      case 1:
        return "月曜日）";
      case 2:
        return "火曜日）";
      case 3:
        return "水曜日）";
      case 4:
        return "木曜日）";
      case 5:
        return "金曜日）";
      case 6:
        return "土曜日）";
      case 7:
        return "日曜日）";
      default:
        return "";
    }
  };

  getRepeatType = (i) => {
    switch (i) {
      case 1:
        return "（毎月";
      case 2:
        return "（毎週"
      case 3:
        return "（毎日）";
      case 4:
        return "（繰り返さない）";
      default:
        return "";
    }
  };

  getHour = (hourData) => hourData === 0 ? 24 : hourData;
  getMinute = (minuteData) => minuteData === 0 ? 60 : minuteData;

  handleSubmit = (
    jobID,
    startDateData,
    repeatHourData,
    repeatMinuteData,
    repeatWeekDayData,
    repeatDateData,
    repeatTypeData,
  ) => {
    const {
      setJobSchedule,
      job_scheduler: {machineList},
    } = this.props;
    let {
      repeatType: rt,
      repeatWeekDay: wd,
      startDate: sd,
      repeatHour: rh,
      repeatMinute: rm,
      repeatDate: rd,
    } = this.state;

    let repeatType = rt || repeatTypeData || null;
    let repeatHourPre = rh || repeatHourData || null;
    let repeatMinutePre = rm || repeatMinuteData || null;
    let repeatWeekDay = wd || repeatWeekDayData || null;
    let repeatDate = rd || repeatDateData || null;
    let startDate = sd || startDateData || today;

    let repeatHour = repeatHourPre === 24 ? 0 : repeatHourPre;
    let repeatMinute = repeatMinutePre === 60 ? 0 : repeatMinutePre;
    let targetMachineIDList = [];
    if (machineList.length > 0) {
      machineList.map((i) => targetMachineIDList.push(i.machineID));
    }

    setJobSchedule({
      jobID,
      repeatType,
      repeatHour,
      repeatMinute,
      repeatWeekDay,
      repeatDate,
      startDate,
      targetMachineIDList,
    }, this.props.makerID);

    this.setState({showSetting: null});
  };

  render() {
    const {
      showDay,
      showWeek,
      showSetting,
      repeatType,
      repeatDate,
      repeatWeekDay,
      repeatHour,
      repeatMinute,
      startDate,
      editing
    } = this.state;

    let {
      job_scheduler: {jobData, machineList},
    } = this.props;

    return (
      <div class="ui fluid container">
        <WindowSizeListener
          onResize={(windowSize) => {
            const gridHeight = windowSize.windowHeight - 130;
            this.setState({gridHeight: gridHeight});
          }}
        />
        <Header title="ジョブスケジューラ"/>
        <Navbar/>

        <div className="main-contents">
          <RobotHeader pageName={"ジョブスケジューラ"}/>
          <Grid>
            <Grid.Row
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                textAlign: "center",
                display: "flex",
                justifyContent: "space-evenly"
              }}
            >
              <Grid.Column width={4}>対象ジョブ</Grid.Column>
              <Grid.Column width={5}>ジョブスケジュール</Grid.Column>
              <Grid.Column width={4}>ジョブ履歴</Grid.Column>
              <Grid.Column width={1}>&nbsp;</Grid.Column>
            </Grid.Row>
          </Grid>
          <List>
            <List.Item>
              {jobData &&
              jobData.map((i, idx) => (
                <div>
                  <Grid>
                    <Grid.Row
                      style={{
                        alignItems: "center",
                        border: "1px solid",
                        borderRadius: "5px",
                        padding: "5px",
                        margin: "10px",
                        justifyContent: "space-between",
                      }}
                    >
                      <Grid.Column width={4}>{i.jobName}</Grid.Column>
                      <Grid.Column
                        width={5}
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        {i.schedule[0].startDate && `${i.schedule[0].startDate}`}&nbsp;&#126;
                        {this.getRepeatType(i.schedule[0].repeatType)}
                        {i.schedule[0].repeatType === 2 ? `${this.getWeekDay(i.schedule[0].repeatWeekDay)}` : ""}
                        {i.schedule[0].repeatType === 1 ? `${i.schedule[0].repeatDate}日）` : ""}
                      </Grid.Column>

                      <Grid.Column
                        width={1}
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >

                        {i.lastState === 1 ? (
                          <Icon name="check circle" color="green"/>
                        ) : (
                          <Icon
                            name="exclamation triangle "
                            color="red"
                          />
                        )}
                      </Grid.Column>
                      <Grid.Column
                        width={4}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Icon name="download"/>
                      </Grid.Column>
                      <Button
                        onClick={() =>
                          this.handleShowSetting(idx, i.jobID)
                        }
                        color="black"
                        disabled={showSetting != null}
                      >
                        Setting
                      </Button>
                    </Grid.Row>
                  </Grid>
                  {showSetting === idx && (
                    <div>
                      <Grid columns={2}>
                        <Grid.Column width={8}>
                          ジョブスケジュール
                          <Grid.Row
                            style={{margin: "10px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                            実施期間：
                            <DateInput
                              name="startDate"
                              placeholder="YYYY-MM-DD"
                              dateFormat="YYYY-MM-DD"
                              value={startDate || i.schedule[0].startDate || today}
                              iconPosition="right"
                              onChange={(e, {value}) => this.setState({startDate: value, editing: true})}
                            />
                            &nbsp;&#126;
                          </Grid.Row>
                          <Grid.Row style={{margin: "10px"}}>
                            実施時刻：
                            <Select
                              value={
                                repeatHour || this.getHour(i.schedule[0].repeatHour)
                              }
                              options={TimeOptions}
                              style={{margin: "5px", minWidth: "50px"}}
                              onChange={(e, {value}) =>
                                this.setState({
                                  repeatHour: value,
                                  editing: true
                                })
                              }
                            />
                            時
                            <Select
                              value={
                                repeatMinute || this.getMinute(i.schedule[0].repeatMinute)
                              }
                              options={MinutesOptions}
                              style={{margin: "5px", minWidth: "50px"}}
                              onChange={(e, {value}) =>
                                this.setState({
                                  repeatMinute: value,
                                  editing: true
                                })
                              }
                            />
                            分
                          </Grid.Row>
                          <Grid.Row
                            style={{
                              margin: "10px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            実施頻度：
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                marginLeft: "10px",
                                height: "180px",
                                justifyContent: "space-evenly",
                              }}
                            >
                              <Grid.Row
                                style={{
                                  height: "38px",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Checkbox
                                  radio
                                  defaultChecked={true}
                                  name="repeatType"
                                  label="毎月"
                                  value={1}
                                  checked={
                                    repeatType === null
                                      ? i.schedule[0].repeatType === 1
                                      : repeatType === 1}
                                  onClick={() =>
                                    this.setState({
                                      showDay: true,
                                      showWeek: false,
                                      repeatType: 1,
                                      repeatWeekDay: null,
                                      repeatDate: null,
                                      editing: true
                                    })
                                  }
                                />
                                {(showDay || (!editing && i.schedule[0].repeatDate && i.schedule[0].repeatType === 1)) && (
                                  <div>
                                    <Select
                                      placeholder="日付"
                                      name="repeatDate"
                                      value={repeatDate === null ? i.schedule[0].repeatDate : repeatDate}
                                      options={DayOptions}
                                      onChange={(e, {value}) =>
                                        this.setState({
                                          repeatDate: value,
                                        })
                                      }
                                      style={{
                                        margin: "0 5px",
                                        minWidth: "50px",
                                      }}
                                    />日</div>
                                )}
                              </Grid.Row>
                              <Grid.Row
                                style={{
                                  height: "38px",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Checkbox
                                  radio
                                  name="repeatType"
                                  label="毎週"
                                  value={2}
                                  checked={
                                    repeatType === null
                                      ? i.schedule[0].repeatType === 2
                                      : repeatType === 2
                                  }
                                  onClick={() =>
                                    this.setState({
                                      showWeek: true,
                                      showDay: false,
                                      repeatType: 2,
                                      repeatDate: null,
                                      editing: true
                                    })
                                  }
                                />
                                {(showWeek || (!editing && i.schedule[0].repeatWeekDay && i.schedule[0].repeatType === 2)) && (
                                  <div>
                                    <Select
                                      placeholder="曜日"
                                      options={WeekOptions}
                                      value={
                                        repeatWeekDay ||
                                        i.schedule[0].repeatWeekDay
                                      }
                                      onChange={(e, {value}) =>
                                        this.setState({
                                          repeatWeekDay: value,
                                          repeatDate: null
                                        })
                                      }
                                      style={{
                                        margin: "0 5px",
                                        minWidth: "50px",
                                      }}
                                    />曜日</div>
                                )}
                              </Grid.Row>
                              <div
                                style={{
                                  height: "38px",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Checkbox
                                  radio
                                  name="repeatType"
                                  label="毎日"
                                  value={3}
                                  checked={
                                    repeatType === null
                                      ? i.schedule[0].repeatType === 3
                                      : repeatType === 3
                                  }
                                  onClick={() =>
                                    this.setState({
                                      showDay: false,
                                      showWeek: false,
                                      repeatType: 3,
                                      repeatWeekDay: null,
                                      repeatDate: null,
                                      editing: true
                                    })
                                  }
                                />
                              </div>

                              <div
                                style={{
                                  height: "38px",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Checkbox
                                  radio
                                  name="repeatType"
                                  label="繰り返さない"
                                  value={4}
                                  checked={
                                    repeatType === 4
                                    || !(repeatType || i.schedule[0].repeatType !== 4)
                                    || !(i.schedule[0].repeatType || repeatType)
                                  }
                                  onClick={() =>
                                    this.setState({
                                      showDay: false,
                                      showWeek: false,
                                      repeatType: 4,
                                      repeatWeekDay: null,
                                      repeatDate: null,
                                      editing: true
                                    })
                                  }
                                />
                              </div>
                            </div>
                          </Grid.Row>
                        </Grid.Column>

                        <Grid.Column width={8}>
                          対象機器
                          <List
                            style={{
                              maxHeight: "300px",
                              overflow: "auto",
                            }}
                          >
                            {!!machineList && machineList.length > 0 &&
                            machineList.map((i) => (
                              <List.Item
                                key={i.machineID}
                                style={{
                                  border: "1px solid",
                                  borderRadius: "5px",
                                  padding: "5px",
                                  margin: "5px",
                                }}
                              >
                                {i.machineName}
                              </List.Item>
                            ))}
                          </List>
                        </Grid.Column>
                      </Grid>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginBottom: "20px",
                        }}
                      >
                        <Button
                          color="blue"
                          onClick={() =>
                            this.setState({
                              showSetting: null,
                              showDay: false,
                              showWeek: false,
                              repeatType: null,
                              repeatDate: null,
                              repeatWeekDay: null,
                              repeatHour: 0,
                              repeatMinute: 0,
                              startDate: null,
                              editing: false
                            })
                          }
                        >
                          Cancel
                        </Button>
                        <Button
                          color="blue"
                          disabled={
                            !!!editing || (
                              repeatType === 2 &&
                              !repeatWeekDay &&
                              !i.schedule[0].repeatWeekDay
                            ) ||
                            (repeatType === 1 &&
                              !repeatDate && !i.schedule[0].repeatDate)
                          }
                          onClick={() =>
                            this.handleSubmit(
                              i.jobID,
                              i.schedule[0].startDate,
                              i.schedule[0].repeatHour,
                              i.schedule[0].repeatMinute,
                              i.schedule[0].weekDay,
                              i.schedule[0].repeatDate,
                              i.schedule[0].repeatType
                            )
                          }
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </List.Item>
          </List>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default JobScheduler;
