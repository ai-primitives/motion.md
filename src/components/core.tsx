import React, { FC } from 'react'
import { IntroProps, OutroProps, TransitionType } from './interfaces'

export const Intro: FC<IntroProps> = ({ title, subtitle, duration = 5, transition = 'fade', children }) => {
  return (
    <div className="intro-slide" style={{ transition }}>
      <h1>{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}
      {children}
    </div>
  )
}

export const Outro: FC<OutroProps> = ({ title, subtitle, duration = 5, transition = 'fade', children }) => {
  return (
    <div className="outro-slide" style={{ transition }}>
      <h1>{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}
      {children}
    </div>
  )
}
