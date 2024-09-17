import styled from "styled-components";

export const InstructionsStyle = styled.div`
  .ant-tabs-nav-list {
    width: 100%;
  }
  .ant-tabs-tab {
    width: 50%;
    display: flex;
    justify-content: center;
  }
  .ant-tabs > .ant-tabs-nav, .ant-tabs > div > .ant-tabs-nav {
    position: relative;
    display: flex;
    flex: none;
    align-items: center;
    width: 500px;
  }
  .ant-tabs-content-holder {
    margin-left: 0;
    margin-right: 0;
  }
  .ant-collapse {
    box-sizing: border-box;
    margin: 0;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    font-feature-settings: 'tnum', "tnum";
    background-color: #fafafa;
    border: 1px solid #d9d9d9;
    border-bottom: 0;
    border-radius: 8px;
    padding: 0 30px;
  }

  .ant-collapse-content {
    color: rgba(0, 0, 0, 0.85);
    background-color: transparent;
    border-top: 1px solid #d9d9d9;
  }

  .ant-collapse > .ant-collapse-item.ant-collapse-no-arrow > .ant-collapse-header {
    padding: 0;
  }
  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
    padding: 12px 16px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 1.5715;
    cursor: pointer;
    transition: all 0.3s, visibility 0s;
  }
  .ant-collapse>.ant-collapse-item:last-child {
    border-bottom: 0 solid #d9d9d9;
  }
  //.row{
  //  padding: 12px 16px;
  //}
`;