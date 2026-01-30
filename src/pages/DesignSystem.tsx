import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, Info } from "lucide-react";

const DesignSystem = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold text-foreground mb-2">Design System</h1>
            <p className="text-muted-foreground">
              A comprehensive guide to all UI components used across Chad Mortensen's portfolio.
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Color Palette Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <ColorSwatch name="Primary" className="bg-primary text-primary-foreground" />
            <ColorSwatch name="Secondary" className="bg-secondary text-secondary-foreground" />
            <ColorSwatch name="Destructive" className="bg-destructive text-destructive-foreground" />
            <ColorSwatch name="Muted" className="bg-muted text-muted-foreground" />
            <ColorSwatch name="Accent" className="bg-accent text-accent-foreground" />
            <ColorSwatch name="Card" className="bg-card text-card-foreground border border-border" />
            <ColorSwatch name="Accent Blue" className="bg-accent-blue text-white" />
            <ColorSwatch name="Accent Orange" className="bg-accent-orange text-white" />
            <ColorSwatch name="Accent Teal" className="bg-accent-teal text-white" />
            <ColorSwatch name="Accent Aqua" className="bg-accent-aqua text-white" />
            <ColorSwatch name="Swiss Charcoal" className="bg-swiss-charcoal text-white" />
            <ColorSwatch name="Swiss Gray" className="bg-swiss-gray text-white" />
          </div>
        </section>

        <Separator className="my-12" />

        {/* Buttons Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Buttons</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Button Sizes</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Button States</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Button>Enabled</Button>
                <Button disabled>Disabled</Button>
                <Button>With Loading</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Form Elements Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Form Elements</h2>

          <Tabs defaultValue="input" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="input">Input</TabsTrigger>
              <TabsTrigger value="checkbox">Checkbox</TabsTrigger>
              <TabsTrigger value="radio">Radio</TabsTrigger>
              <TabsTrigger value="select">Select</TabsTrigger>
            </TabsList>

            <TabsContent value="input">
              <Card>
                <CardHeader>
                  <CardTitle>Text Input</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="disabled">Disabled Input</Label>
                    <Input id="disabled" placeholder="Disabled" disabled />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="checkbox">
              <Card>
                <CardHeader>
                  <CardTitle>Checkbox</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="font-normal cursor-pointer">
                      I agree to the terms and conditions
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="disabled" disabled />
                    <Label htmlFor="disabled" className="font-normal text-muted-foreground cursor-not-allowed">
                      Disabled checkbox
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="radio">
              <Card>
                <CardHeader>
                  <CardTitle>Radio Group</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2 mb-4">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one" className="font-normal cursor-pointer">
                        Option 1
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two" className="font-normal cursor-pointer">
                        Option 2
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-three" id="option-three" />
                      <Label htmlFor="option-three" className="font-normal cursor-pointer">
                        Option 3
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="select">
              <Card>
                <CardHeader>
                  <CardTitle>Select Dropdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="select">Choose an option</Label>
                    <Select>
                      <SelectTrigger id="select">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="opt1">Option 1</SelectItem>
                        <SelectItem value="opt2">Option 2</SelectItem>
                        <SelectItem value="opt3">Option 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <Separator className="my-12" />

        {/* Data Display Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Data Display</h2>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Card</CardTitle>
                <CardDescription>A container component for content organization</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This is a card component. It provides a clean container for organizing content with a border and padding.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Badges</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Avatar</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CM</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Feedback Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Feedback Components</h2>

          <div className="space-y-6">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                This is an informational alert. Use it to communicate important information to users.
              </AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                This is a destructive alert. Use it to warn users about critical actions.
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle>Tooltip</CardTitle>
              </CardHeader>
              <CardContent>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is a tooltip</p>
                  </TooltipContent>
                </Tooltip>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Interactive Components Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Interactive Components</h2>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Switch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Enable notifications</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Disabled switch</Label>
                  <Switch disabled />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dialog</CardTitle>
              </CardHeader>
              <CardContent>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Dialog Title</DialogTitle>
                      <DialogDescription>
                        This is a dialog component. It displays content in a modal overlay.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm text-muted-foreground">
                        Use dialogs for important decisions or form submissions.
                      </p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setDialogOpen(false)}>
                        Confirm
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accordion</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Is it styled?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It comes with default styles that you can customize.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Is it animated?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It's animated by default, but you can disable it.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Textarea</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Enter your message here..." />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Typography Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Typography</h2>

          <Card>
            <CardContent className="pt-6 space-y-6">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Display</p>
                <h1 className="text-4xl font-bold">Display Heading</h1>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Large Heading</p>
                <h2 className="text-3xl font-bold">Large Heading</h2>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Medium Heading</p>
                <h3 className="text-2xl font-bold">Medium Heading</h3>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Small Heading</p>
                <h4 className="text-xl font-bold">Small Heading</h4>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Body Text</p>
                <p>This is regular body text. It's used for the main content on the page.</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Small Text</p>
                <p className="text-sm">This is small text, typically used for secondary information.</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Muted Text</p>
                <p className="text-muted-foreground">This is muted text for less important information.</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <div className="py-8 border-t">
          <p className="text-center text-muted-foreground">
            Design System • Last updated {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </main>
  );
};

function ColorSwatch({
  name,
  className,
}: {
  name: string;
  className: string;
}) {
  return (
    <div className="space-y-2">
      <div className={`h-24 rounded-lg ${className} flex items-center justify-center`}>
        {name}
      </div>
      <p className="text-sm text-muted-foreground text-center">{name}</p>
    </div>
  );
}

export default DesignSystem;
