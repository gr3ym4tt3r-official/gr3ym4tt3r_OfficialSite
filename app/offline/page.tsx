'use client'

import { ContainedPageLayout } from '@/components/layout'
import { Container, Stack, DisplayHeading, Text, Button } from '@/design-system'
import { Wifi, RefreshCw } from 'lucide-react'


export default function OfflinePage() {
  return (
    <ContainedPageLayout>
      <section className="py-20 text-center">
        <Container size="sm">
          <Stack space="lg">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-grey-900 rounded-full mb-8">
              <Wifi className="w-12 h-12 text-grey-400" />
            </div>
            
            <DisplayHeading size="xl">
              You&apos;re Offline
            </DisplayHeading>
            
            <Text color="secondary" className="text-lg max-w-md mx-auto">
              It looks like you&apos;ve lost your connection. Don&apos;t worry—some content 
              might still be available from your last visit.
            </Text>
            
            <div className="pt-8">
              <Button
                variant="primary"
                size="lg"
                onClick={() => window.location.reload()}
                className="inline-flex items-center space-x-2"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Try Again</span>
              </Button>
            </div>
            
            <div className="pt-12 border-t border-grey-800">
              <Text color="secondary" size="sm">
                Once you&apos;re back online, you&apos;ll be able to access all features again.
              </Text>
            </div>
          </Stack>
        </Container>
      </section>
    </ContainedPageLayout>
  )
}