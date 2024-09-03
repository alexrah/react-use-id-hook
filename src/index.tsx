import React, {createContext, useContext, useRef} from 'react'

type tIdProviderProps = {
	children: React.ReactNode
	prefix?: string
}

const Id = createContext<() => string>(() => {
	throw new TypeError('Please wrap your application with IdProvider')
})

type IdState = {
	id: number
	get(): string
}
const useIdGetter = (prefix: string) => {
	let prefixFormatted = prefix.length > 0 ? `${prefix}-` : ''
	const ref = useRef<IdState>()
	if (!ref.current) {
		const me = {id: 0, get: () => `${prefixFormatted}${me.id++}`}
		ref.current = me
	}
	return ref.current.get
}

export const IdProvider = ({children, prefix = 'id'}: tIdProviderProps) => {
	const get = useIdGetter(prefix)
	return <Id.Provider value={get}>{children}</Id.Provider>
}

export const useId = () => {
	const getter = useContext(Id)
	const ref = useRef<string>()
	if (!ref.current) ref.current = getter()
	return ref.current
}

export const useGetId = () => {
	const getter = useContext(Id)
	const base = useRef<string>()
	if (!base.current) base.current = getter()
	return useIdGetter(base.current)
}
