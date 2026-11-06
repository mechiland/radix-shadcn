import { demoAction } from '@/examples/demo-actions'


import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function NoTeamMembers() {
  return (
    <Card>
      <CardContent>
        <Empty className="h-56 border">
          <EmptyHeader>
            <EmptyMedia>
              <AvatarGroup className="grayscale">
                <Avatar size="lg">
                  <AvatarImage
                    src="./images/upstream-0a10b9bc070f.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage
                    src="./images/upstream-96b8bd25ab6e.png"
                    alt="@maxleiter"
                  />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage
                    src="./images/upstream-eb59b55e1933.png"
                    alt="@evilrabbit"
                  />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </AvatarGroup>
            </EmptyMedia>
            <EmptyTitle>No Team Members</EmptyTitle>
            <EmptyDescription>
              Invite your team to collaborate on this project.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={demoAction} size="sm">Invite Members</Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}
