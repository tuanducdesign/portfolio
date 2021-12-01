import dynamic from 'next/dynamic'
import { SVGProps } from 'react'
import Gatsby from './Gatsby'
import Go from './Go'
import Graphql from './Graphql'
import NextJs from './NextJs'

const ExpressJs = dynamic(() => import('./ExpressJs'))
const Javascript = dynamic(() => import('./Javascript'))
const MongoDb = dynamic(() => import('./MongoDb'))
const NodeJs = dynamic(() => import('./NodeJs'))
const Svelte = dynamic(() => import('./Svelte'))
const Typescript = dynamic(() => import('./Typescript'))
const Vue = dynamic(() => import('./Vue'))
const ReactIcon = dynamic(() => import('./ReactJs'))

export type IconName =
  | 'javascript'
  | 'typescript'
  | 'vue'
  | 'react_js'
  | 'express_js'
  | 'mongo_db'
  | 'node_js'
  | 'svelte'
  | 'gatsby'
  | 'next_js'
  | 'graphql'
  | 'go'

type TechIconProps = { name: IconName; size?: number } & SVGProps<SVGSVGElement>

const TechIcon = ({ name, size = 24, ...props }: TechIconProps) => {
  switch (name) {
    case 'react_js':
      return <ReactIcon width={size} height={size} {...props} />
    case 'node_js':
      return <NodeJs width={size} height={size} {...props} />
    case 'express_js':
      return <ExpressJs width={size} height={size} {...props} />
    case 'mongo_db':
      return <MongoDb width={size} height={size} {...props} />
    case 'svelte':
      return <Svelte width={size} height={size} {...props} />
    case 'vue':
      return <Vue width={size} height={size} {...props} />
    case 'typescript':
      return <Typescript width={size} height={size} {...props} />
    case 'javascript':
      return <Javascript width={size} height={size} {...props} />
    case 'gatsby':
      return <Gatsby width={size} height={size} {...props} />
    case 'next_js':
      return <NextJs width={size} height={size} {...props} />
    case 'graphql':
      return <Graphql width={size} height={size} {...props} />
    case 'go':
      return <Go width={size} height={size} {...props} />
    default:
      return <span />
  }
}

export default TechIcon
