import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styleConstructor from './style';
import { weekDayNames } from '../../dateutils';
import {
  IC_HIIT,
  IC_HIIT_ACCENT,
  IC_PULL,
  IC_PULL_ACCENT,
  IC_LEGS,
  IC_LEGS_ACCENT,
  IC_PUSH,
  IC_PUSH_ACCENT,
  IC_REST,
  IC_REST_ACCENT,
} from '../img';

class CalendarHeader extends Component {
  constructor(props) {
    super(props);
    this.style = styleConstructor(props.theme);
    this.addMonth = this.addMonth.bind(this);
    this.substractMonth = this.substractMonth.bind(this);
  }

  addMonth() {
    this.props.addMonth(1);
  }

  substractMonth() {
    this.props.addMonth(-1);
  }

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.month.toString('yyyy MM') !==
      this.props.month.toString('yyyy MM')
    ) {
      return true;
    }
    if (nextProps.showIndicator !== this.props.showIndicator) {
      return true;
    }
    return false;
  }

  renderExercisePanel = () => {
    const currentData = new Date();
    const currentDay = currentData.getDay() - 1;
    // const days = [1, 2, 3, 4, 5, 6, 7];
    const days = [
      {regular: IC_PULL, accent: IC_PULL_ACCENT}, // 1
      {regular: IC_HIIT, accent: IC_HIIT_ACCENT}, // 2
      {regular: IC_LEGS, accent: IC_LEGS_ACCENT}, // 3
      {regular: IC_HIIT, accent: IC_HIIT_ACCENT}, // 4
      {regular: IC_PUSH, accent: IC_PUSH_ACCENT}, // 5
      {regular: IC_HIIT, accent: IC_HIIT_ACCENT}, // 6
      {regular: IC_REST, accent: IC_REST_ACCENT}, // 7
    ];
    return days.map((item, index) => {
      if (index === currentDay) {
        return <View><Image source={item.accent} /></View>;
      }
      return <View><Image source={item.regular} /></View>;
    });
  }

  render() {
    let leftArrow = <View />;
    let rightArrow = <View />;
    let weekDaysNames = weekDayNames(this.props.firstDay);
    if (!this.props.hideArrows) {
      leftArrow = (
        <TouchableOpacity
          onPress={this.substractMonth}
          style={this.style.arrow}
        >
          {this.props.renderArrow
            ? this.props.renderArrow('left')
            : <Image
                source={require('../img/previous.png')}
                style={this.style.arrowImage}
              />}
        </TouchableOpacity>
      );
      rightArrow = (
        <TouchableOpacity onPress={this.addMonth} style={this.style.arrow}>
          {this.props.renderArrow
            ? this.props.renderArrow('right')
            : <Image
                source={require('../img/next.png')}
                style={this.style.arrowImage}
              />}
        </TouchableOpacity>
      );
    }
    let indicator;
    if (this.props.showIndicator) {
      indicator = <ActivityIndicator />;
    }
    return (
      <View>
        <View style={this.style.header}>
          {leftArrow}
          <View style={{ flexDirection: 'row' }}>
            <Text style={this.style.monthText}>
              {this.props.month.toString('MMMM yyyy')}
            </Text>
            {indicator}
          </View>
          {rightArrow}
        </View>
        <View style={this.style.week}>
          {weekDaysNames.map(day => (
            <Text key={day} style={this.style.dayHeader}>{day}</Text>
          ))}
          <View style={this.style.exercisePanel}>
            {this.renderExercisePanel()}
          </View>
        </View>
      </View>
    );
  }
}

export default CalendarHeader;
