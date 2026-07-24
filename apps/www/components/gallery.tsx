"use client";

import { Bell, Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/registry/doodle/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/registry/doodle/ui/alert";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/registry/doodle/ui/avatar";
import { Badge } from "@/registry/doodle/ui/badge";
import { Button } from "@/registry/doodle/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/registry/doodle/ui/card";
import { Checkbox } from "@/registry/doodle/ui/checkbox";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/registry/doodle/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/registry/doodle/ui/dropdown-menu";
import { Input } from "@/registry/doodle/ui/input";
import { Label } from "@/registry/doodle/ui/label";
import { Progress } from "@/registry/doodle/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/registry/doodle/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/registry/doodle/ui/select";
import { Separator } from "@/registry/doodle/ui/separator";
import { Slider } from "@/registry/doodle/ui/slider";
import { Switch } from "@/registry/doodle/ui/switch";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/registry/doodle/ui/tabs";
import { Textarea } from "@/registry/doodle/ui/textarea";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/registry/doodle/ui/tooltip";
import { toast } from "sonner";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6">
      <h3 className="font-display text-3xl">{title}</h3>
      <div className="flex flex-wrap items-start gap-6">{children}</div>
    </section>
  );
}

function Tile({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-w-[240px] flex-1 flex-col gap-4 border-2 border-border doodle-radius-card bg-card p-6">
      {children}
    </div>
  );
}

export function Gallery() {
  const [progress, setProgress] = React.useState(42);

  return (
    <TooltipProvider>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 py-20">
        <div id="components" className="scroll-mt-8">
          <h2 className="font-display text-5xl">The whole crayon box</h2>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Every shadcn/ui primitive, wearing wobbly corners. Toggle dark mode
            up top — the doodle look holds in both.
          </p>
        </div>

        <Section title="Buttons">
          <Tile>
            <div className="flex flex-wrap gap-3">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button>Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" aria-label="Notify">
                <Bell />
              </Button>
            </div>
          </Tile>
          <Tile>
            <Badge>Badge</Badge>
            <div className="flex flex-wrap gap-2">
              <Badge>New</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Oops</Badge>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>A wobbly little tooltip</TooltipContent>
            </Tooltip>
          </Tile>
        </Section>

        <Section title="Forms">
          <Tile>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Scribble here…" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="msg">Message</Label>
              <Textarea id="msg" placeholder="Say something nice" />
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="agree" defaultChecked />
              <Label htmlFor="agree">I like crayons</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch id="wifi" defaultChecked />
              <Label htmlFor="wifi">Wobble mode</Label>
            </div>
          </Tile>
          <Tile>
            <div className="flex flex-col gap-2">
              <Label>Pick a snack</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cookies">Cookies</SelectItem>
                  <SelectItem value="crayons">Crayons (don&apos;t)</SelectItem>
                  <SelectItem value="juice">Juice box</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <RadioGroup defaultValue="a" className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="a" id="r-a" />
                <Label htmlFor="r-a">Option A</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="b" id="r-b" />
                <Label htmlFor="r-b">Option B</Label>
              </div>
            </RadioGroup>
            <div className="flex flex-col gap-2">
              <Label>Volume</Label>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>
          </Tile>
        </Section>

        <Section title="Feedback">
          <Tile>
            <Alert>
              <Check />
              <AlertTitle>All doodled up</AlertTitle>
              <AlertDescription>
                Your components now have hand-drawn corners.
              </AlertDescription>
            </Alert>
            <div className="flex flex-col gap-2">
              <Label>Progress</Label>
              <Progress value={progress} />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setProgress((p) => Math.max(0, p - 10))}
                >
                  -10
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setProgress((p) => Math.min(100, p + 10))}
                >
                  +10
                </Button>
              </div>
            </div>
            <Button
              variant="secondary"
              onClick={() =>
                toast("Squiggle!", {
                  description: "A toast with wobbly edges.",
                })
              }
            >
              Show toast
            </Button>
          </Tile>
          <Tile>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>DU</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Doodle User</p>
                <p className="text-sm text-muted-foreground">
                  Blobby by default
                </p>
              </div>
            </div>
            <Separator />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Open menu <ChevronsUpDown className="ml-1 size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Doodles</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Squiggle</DropdownMenuItem>
                <DropdownMenuItem>Scribble</DropdownMenuItem>
                <DropdownMenuItem>Blob</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Tile>
        </Section>

        <Section title="Surfaces">
          <Card className="min-w-[280px] flex-1 border-2">
            <CardHeader>
              <CardTitle>Card title</CardTitle>
              <CardDescription>
                Cards get the roomiest blob corners.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Compose headers, content, and footers — all hand-drawn.
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>A wobbly dialog</DialogTitle>
                    <DialogDescription>
                      Overlays use the modal blob radius.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Close</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>

          <div className="flex min-w-[280px] flex-1 flex-col gap-6">
            <Tabs defaultValue="one">
              <TabsList>
                <TabsTrigger value="one">One</TabsTrigger>
                <TabsTrigger value="two">Two</TabsTrigger>
                <TabsTrigger value="three">Three</TabsTrigger>
              </TabsList>
              <TabsContent value="one" className="pt-3 text-muted-foreground">
                The first tab.
              </TabsContent>
              <TabsContent value="two" className="pt-3 text-muted-foreground">
                The second tab.
              </TabsContent>
              <TabsContent value="three" className="pt-3 text-muted-foreground">
                The third tab.
              </TabsContent>
            </Tabs>

            <Accordion
              type="single"
              collapsible
              className="border-2 border-border doodle-radius-card px-4"
            >
              <AccordionItem value="a">
                <AccordionTrigger>What is Doodle UI?</AccordionTrigger>
                <AccordionContent>
                  A childish theme for shadcn/ui with hand-drawn corners.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="b">
                <AccordionTrigger>Does dark mode work?</AccordionTrigger>
                <AccordionContent>
                  Yes — toggle it in the top right.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Section>
      </div>
    </TooltipProvider>
  );
}
