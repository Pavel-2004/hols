const { css } = require('emotion')
const { html } = require('../utils')
const { theme } = require('../styles')
const DateHtml = require('./DateHtml.js')
const { relativeDate } = require('../dates')

const styles = ({ accent = theme.color.red } = {}) => css`
  padding: ${theme.space.xl} ${theme.space.lg};
  background-color: ${accent};
  color: white;
  margin: -${theme.space.lg} -${theme.space.lg} 0 -${theme.space.lg};

  @media (${theme.mq.md}) {
    font-size: 3vw;
    margin-right: -${theme.space.xxl};
  }

  @media (${theme.mq.lg}) {
    font-size: 2.8vw;
  }

  @media (${theme.mq.xl}) {
    font-size: 2.2vw;
  }

  h1,
  p {
    width: 100%;

    @media (${theme.mq.sm}) {
      width: 90%;
    }

    @media (${theme.mq.md}) {
      width: 70%;
      max-width: 750px;
    }
  }

  h1 + p {
    margin-bottom: 0;
    margin-top: ${theme.space.xl};

    a,
    a:visited {
      color: white;
    }
  }

  time {
    color: white;
    display: inline-block;
    min-width: 80%;
    font-size: 1.15em;
    @media (${theme.mq.lg}) {
      font-size: 1.25em;
    }
  }
`

const renderCelebreatingProvinces = provinces => {
  if (provinces.length === 1) {
    return html`
      <p>Celebrated by${' '}<a href=${`/province/${provinces[0].id}`}>${provinces[0].nameEn}</a></p>
    `
  }

  if (provinces.length === 13) {
    return html`
      <p>Celebrated by${' '}<a href="/provinces">all provinces and territories</a></p>
    `
  }

  const isLastProvince = province => province.id === provinces[provinces.length - 1].id

  return html`
    <p>
      Celebrated by
      ${provinces.map(
        p => html`
          ${isLastProvince(p) ? ' and ' : ' '}<a href=${`/province/${p.id}`}>${p.id}</a
          >${isLastProvince(p) ? '' : ','}
        `,
      )}
    </p>
  `
}

const renderRelativeDate = dateString => {
  return html`
    <p>${relativeDate(dateString)}</p>
  `
}

const nextHolidayBox = ({ nextHoliday, provinceName = 'Canada', provinceId }) => {
  return html`
    <div class=${provinceId ? styles(theme.color[provinceId]) : styles()}>
      <h1>
        ${provinceName}’s next public holiday is${' '}
        <span class="hol-name">${nextHoliday.nameEn}</span>
        ${' '}on${' '}<${DateHtml} dateString=${nextHoliday.date} //>
      </h1>
      ${nextHoliday.provinces
        ? renderCelebreatingProvinces(nextHoliday.provinces)
        : renderRelativeDate(nextHoliday.date)}
    </div>
  `
}

module.exports = nextHolidayBox
