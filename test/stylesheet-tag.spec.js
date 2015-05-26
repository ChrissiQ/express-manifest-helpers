import fs from 'fs'

import {expect} from 'chai'
import sinon from 'sinon'

import manifestHelpers from '../lib'
import { stylesheetTag } from '../lib'

describe('#stylesheetTag', function(){
  const manifestPath = 'some/path/manifest.json'
  const manifest = { 'style.css': 'style.5678.css' }

  beforeEach(function(){
    sinon.stub(fs, 'readFileSync')
      .returns(JSON.stringify(manifest))
    manifestHelpers({ manifestPath })
  })

  afterEach(function(){
    fs.readFileSync.restore()
  })

  it('exists', function(){
    expect(stylesheetTag).to.exist
  })

  it('returns an link tag to the proper file', function(){
    let source = 'style.css'
    let result = stylesheetTag(source)
    let expected = `<link rel="${manifest[source]}" />`

    expect(result).to.equal(expected)
  })

  it('handles malformed input', function(){
    let expected = '<link rel="" />'

    expect(stylesheetTag('missing-file.js')).to.equal(expected)
    expect(stylesheetTag(123)).to.equal(expected)
    expect(stylesheetTag()).to.equal(expected)
    expect(stylesheetTag(undefined)).to.equal(expected)
    expect(stylesheetTag(null)).to.equal(expected)
  })
})