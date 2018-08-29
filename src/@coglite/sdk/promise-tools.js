//https://github.com/nathan/ptl
'use strict'

//const itt = require('itt')
const itt = require('./iterator-tools')

function all(ps) {return Promise.resolve(ps).then(ps => Promise.all(ps))}
function race(ps) {return Promise.resolve(ps).then(ps => Promise.race(ps))}
function any(ps) {return Promise.resolve(ps).then(ps => dual(all(itt(ps).map(dual))))}
function dual(p) {return new Promise((r, j) => Promise.resolve(p).then(j, r))}
function try_(fn) {return new Promise(r => r(fn()))}

const asyncIterator = Symbol.asyncIterator
function limit(n, xs) {return Promise.resolve(xs).then(xs => new Promise((resolve, reject) => {
  const it = asyncIterator && xs[asyncIterator] ? xs[asyncIterator]() : xs[Symbol.iterator] ? xs[Symbol.iterator]() : xs
  const pool = new Set
  const result = []
  let index = 0, done = false
  const rejected = e => {
    done = true
    reject(e)
  }
  const advance = (p, i, x) => {
    if (p) {
      pool.delete(p)
      result[i] = x
      if (done) {
        if (pool.size === 0) resolve(result)
        return
      }
    }
    const k = index++
    const p2 = Promise.resolve(it.next()).then(n => {
      if (n.done) {
        pool.delete(p2)
        done = true
        if (pool.size === 0) resolve(result)
        return
      }
      Promise.resolve(n.value).then(x => advance(p2, k, x), rejected)
    }, rejected)
    pool.add(p2)
  }
  while (pool.size < n && !done) advance()
}))}

function serial(xs) {return Promise.resolve(xs).then(xs => new Promise((resolve, reject) => {
  const it = asyncIterator && xs[asyncIterator] ? xs[asyncIterator]() : xs[Symbol.iterator] ? xs[Symbol.iterator]() : xs
  const result = []
  let index = 0
  const advance = () => {
    Promise.resolve(it.next()).then(n => {
      if (n.done) {
        resolve(result)
        return
      }
      Promise.resolve(n.value).then(x => {
        result.push(x)
        advance()
      }, reject)
    }, reject)
  }
  advance()
}))}

function sleep(ms) {return new Promise(r => setTimeout(r, ms))}
function immediate() {return new Promise(r => setImmediate(r))}

Object.assign(exports, {
  all, race, any, dual,
  try: try_,
  limit, serial,
  sleep, immediate,
})