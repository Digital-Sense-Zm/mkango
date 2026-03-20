import config from '@/payload.config'
import '@payloadcms/next/css'
import { RootLayout } from '@payloadcms/next/layouts'
import { importMap } from '@/app/(payload)/admin/importMap'
import React from 'react'

import { handleServerFunctions } from '@payloadcms/next/layouts'

type Args = {
  children: React.ReactNode
}

const serverFunction = async function (args: any) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

export const metadata = { title: 'Payload Admin' }

export default function Layout({ children }: Args) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}
