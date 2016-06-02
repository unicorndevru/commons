import './styles.css'

import React from 'react'
import {times, last, add, slice, map, type} from 'ramda'
import {connect} from "react-redux";
import {page, limitOffset} from "commons/pagination/components/routines"

import {
  RaisedButton,
  TextField,
  DropDownMenu,
  MenuItem
} from 'material-ui'

export default (props) => {

  const pagesData = ({ limit, offset, total, itemsLength, cached }) => {
    let count = null
    let numbers = null
    let active = page(limit, offset)
    let lastPage = null
    let first = 1
    let prev = null
    let next = null
    let firstElement = null
    let lastElement = null

    if(total){
      count = Math.ceil(total / limit)
      numbers = times(add(1), count)
      lastPage = last(numbers)
      first = numbers[0]
    } else if(cached){
      count = Math.ceil(cached / limit)
      numbers = times(add(1), count)
      lastPage = last(numbers)
      first = numbers[0]
    } else if( 0 < itemsLength) {
      count = Infinity
      numbers = times(add(Math.max(1, active - 3)), 7)
      lastPage = Infinity
    } else {
      count = 0
      numbers = []
      lastPage = 0
      active = 0
      first = 0
    }

    if(first < active) {
      prev = active - 1
    }

    if(active < lastPage) {
      next = active + 1
    }

    firstElement = offset + 1;
    lastElement = offset + limit;
    if(lastElement > total) {
      lastElement = total
    }

    return { count, active, prev, next, first, last: lastPage, numbers, firstElement, lastElement, limit}
  }

  const pages = pagesData({limit: props.limit, offset: props.offset || 0, total: props.total, itemsLength: props.itemsLength, cached: false})

  const setPage = (n, append = false) => (e) => {
    const params = {...limitOffset(n, props.limit), append:append}
    !!props.setPage ? props.setPage(params) : console.log("goto page", n, params)
  }

  const goToPage = (e) => {
    let value =  parseInt(e.target.value);
    let n = ((0 > value || value > pages.count) && type(value) == 'Number') ? pages.active : value;
    const params = {...limitOffset(n, props.limit), append:false}
    props.setPage(params);
  }

  const setLimit = (event, index, obj) => {
    let n = 1;
    const params = {...limitOffset(n, obj), append:false}
    props.setPage(params);
  }

  return (
    <div className="Pagination">
      { (pages.active != pages.last) && <div className="Pagination-loadMore-container">
        <RaisedButton label="Загрузить ещё" fullWidth={true} className="Pagination-loadMore-btn" onClick={ setPage(pages.next, true) }/>
      </div> }
      <div className="Pagination-list">
        {(pages.count > 1) && <div className="Pagination-item">{pages.active} из {pages.count} страниц</div>
          || <div className="Pagination-item"> {props.total} результатов </div>
        }
         {(pages.count > 1) && <div className="Pagination-item GoTo">
          Перейти к
          <div className="GoTo-inputContainer">
            <TextField name="goto" className="GoTo-input" onChange={goToPage} fullWidth={true} />
          </div>
        </div>
        }
        <div className="Pagination-divider" />
        <div className="Pagination-item Limit">Показать 
        <DropDownMenu className="Limit-input" value={pages.limit} onChange={setLimit} >
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={20} primaryText="20" />
          <MenuItem value={50} primaryText="50" />
          <MenuItem value={100} primaryText="100" />
        </DropDownMenu>
         строк на странице</div>
        <div className="Pagination-item">{pages.firstElement}-{pages.lastElement} из {props.total}</div>
        <div className="Pagination-item">
          <RaisedButton label="<" secondary={true} disabled={ pages.active == pages.first } onClick={ setPage(pages.prev) } />
        </div>
        <div className="Pagination-item">
          <RaisedButton label=">" secondary={true} disabled={pages.active == pages.last} onClick={ setPage(pages.next) } />
        </div>
      </div>
    </div>
  )
}
