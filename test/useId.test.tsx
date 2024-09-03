import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {useId, IdProvider, useGetId} from '../src'

const MultiId: React.FunctionComponent = ({children}) => {
	const getId = useGetId()
	return (
		<>
			{getId()} + {getId()}
			{children && (
				<>
					: {children}
					: <Id />
					: <MultiId />
				</>
			)}
		</>
	)
}

const Id: React.FunctionComponent = ({children}) => {
	const id = useId()
	return (
		<>
			{id}
			{children && <>:{children}</>}
		</>
	)
}

describe('it', () => {
	it('creates ids with standard prefix', () => {
		const div = document.createElement('div')

		const App = () => (
			<IdProvider>
				<Id />
				{' / '}
				<Id>
					<Id /> - <MultiId>Hi</MultiId>
				</Id>
			</IdProvider>
		)
		ReactDOM.render(<App />, div)
		expect(div.innerHTML).toBe(
			`id-0 / id-1:id-2 - id-3-0 + id-3-1: Hi: id-4: id-5-0 + id-5-1`
		)
		ReactDOM.unmountComponentAtNode(div)
	})

	it('works with different prefixes', () => {
		const div = document.createElement('div')
		const App = () => (
			<IdProvider prefix="my">
				<Id />
				{' / '}
				<Id>
					<Id /> - <MultiId>Hi</MultiId>
				</Id>
			</IdProvider>
		)
		ReactDOM.render(<App />, div)
		expect(div.innerHTML).toBe(
			`my-0 / my-1:my-2 - my-3-0 + my-3-1: Hi: my-4: my-5-0 + my-5-1`
		)
		ReactDOM.unmountComponentAtNode(div)
	})
})
