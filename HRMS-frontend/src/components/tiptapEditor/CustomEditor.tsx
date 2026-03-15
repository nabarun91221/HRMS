'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Icon } from '@iconify-icon/react';
import BulletList from '@tiptap/extension-bullet-list';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import OrderedList from '@tiptap/extension-ordered-list';
import TextAlign from '@tiptap/extension-text-align';
import { FontSize, TextStyle } from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';
import LinkModal from './LinkModal';

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: {
    underline?: boolean;
    bulletList?: boolean;
    orderedList?: boolean;
    bold?: boolean;
    italic?: boolean;
    fontSize?: boolean;
    highlight?: boolean;
    textAlign?: boolean;
    blockquote?: boolean;
    strike?: boolean;
    hardBreak?: boolean;
    undo?: boolean;
    redo?: boolean;
    table?: boolean;
    link?: boolean;
  };
}

const FeaturedCustomEditor = ({ value = '', onChange, disabled }: Props) => {
  const [currentFontSize, setCurrentFontSize] = useState('default');
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [isTextSelected, setIsTextSelected] = useState(false);
  const [linkData, setLinkData] = useState<{
    url: string;
    openInNewTab: boolean;
    isEditing: boolean;
  }>({
    url: '',
    openInNewTab: true,
    isEditing: false,
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      BulletList,
      OrderedList,
      Heading.configure({ levels: [1, 2] }),
      FontSize,
      TextStyle,
      Highlight,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline cursor-pointer',
          rel: 'noopener noreferrer',
        },
      }),
    ],

    immediatelyRender: false,
    content: value,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    onSelectionUpdate: () => {
      setCurrentFontSize(getCurrentFontSize());
      setIsTextSelected(hasTextSelection());
    },
  });

  const handleLinkClick = () => {
    if (!editor) return;

    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to);

    if (!selectedText.trim()) {
      return;
    }
    const linkAttributes = editor.getAttributes('link');
    const isEditing = !!linkAttributes.href;

    setLinkData({
      url: linkAttributes.href || '',
      openInNewTab: linkAttributes.target === '_blank',
      isEditing,
    });
    setShowLinkModal(true);
  };

  const handleLinkSet = (url: string, openInNewTab: boolean) => {
    if (!editor) return;

    editor
      .chain()
      .focus()
      .setLink({
        href: url,
        target: openInNewTab ? '_blank' : '_self',
      })
      .run();
  };

  const handleLinkRemove = () => {
    if (!editor) return;

    editor.chain().focus().unsetLink().run();
  };

  const hasTextSelection = () => {
    if (!editor) return false;
    const { from, to } = editor.state.selection;
    return from !== to;
  };

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, {
        emitUpdate: false,
      });
    }
  }, [value, editor]);

  if (!editor) return <p className='text-muted-foreground'>Loading editor...</p>;

  const getCurrentFontSize = () => {
    if (!editor) return 'default';
    const fontSize = editor.getAttributes('textStyle').fontSize;
    return fontSize || 'default';
  };
  const handleFontSizeChange = (value: string) => {
    if (value === 'default') {
      editor.chain().focus().unsetFontSize().run();
    } else {
      editor.chain().focus().setFontSize(value).run();
    }
  };

  return (
    <div className='space-y-4'>
      <Card>
        <CardHeader>
          <div className='flex flex-wrap gap-2'>
            {disabled?.bold !== true && (
              <Button
                type='button'
                variant={editor.isActive('bold') ? 'default' : 'outline'}
                size='sm'
                onClick={() => editor.chain().focus().toggleBold().run()}
                title='Bold'
              >
                <Icon className='text-lg' icon={'lucide:bold'} />
              </Button>
            )}
            {disabled?.italic !== true && (
              <Button
                type='button'
                variant={editor.isActive('italic') ? 'default' : 'outline'}
                size='sm'
                onClick={() => editor.chain().focus().toggleItalic().run()}
                title='Italic'
              >
                <Icon className='text-lg' icon={'lucide:italic'} />
              </Button>
            )}
            {disabled?.underline !== true && (
              <Button
                type='button'
                variant={editor.isActive('underline') ? 'default' : 'outline'}
                size='sm'
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                title='Underline'
              >
                <Icon className='text-lg' icon={'lucide:underline'} />
              </Button>
            )}

            {disabled?.fontSize !== true && (
              <Select value={currentFontSize} onValueChange={handleFontSizeChange}>
                <SelectTrigger className='w-[180px]' title='Font Size'>
                  <SelectValue placeholder='Select font size' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='default'>Default</SelectItem>
                  <SelectItem value='12px'>12px</SelectItem>
                  <SelectItem value='14px'>14px</SelectItem>
                  <SelectItem value='16px'>16px</SelectItem>
                  <SelectItem value='18px'>18px</SelectItem>
                  <SelectItem value='24px'>24px</SelectItem>
                  <SelectItem value='28px'>28px</SelectItem>
                  <SelectItem value='32px'>32px</SelectItem>
                  <SelectItem value='48px'>48px</SelectItem>
                  <SelectItem value='64px'>64px</SelectItem>
                </SelectContent>
              </Select>
            )}

            {disabled?.bulletList !== true && (
              <Button
                type='button'
                variant={editor.isActive('bulletList') ? 'default' : 'outline'}
                size='sm'
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                title='Bullet List'
              >
                <Icon className='text-lg' icon={'lucide:list'} />
              </Button>
            )}
            {disabled?.orderedList !== true && (
              <Button
                type='button'
                variant={editor.isActive('orderedList') ? 'default' : 'outline'}
                size='sm'
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                title='Ordered List'
              >
                <Icon className='text-lg' icon={'lucide:list-ordered'} />
              </Button>
            )}
            {disabled?.blockquote !== true && (
              <Button
                type='button'
                size={'sm'}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                variant={editor.isActive('blockquote') ? 'default' : 'outline'}
                title='Blockquote'
              >
                <Icon className='text-lg' icon={'lucide:quote'} />
              </Button>
            )}
            {disabled?.strike !== true && (
              <Button
                type='button'
                onClick={() => editor.chain().focus().toggleStrike().run()}
                variant={editor.isActive('strike') ? 'default' : 'outline'}
                size='sm'
                title='Strike'
              >
                <Icon className='text-lg' icon={'lucide:strikethrough'} />
              </Button>
            )}
            {disabled?.highlight !== true && (
              <Button
                type='button'
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                variant={editor.isActive('highlight') ? 'default' : 'outline'}
                size='sm'
                title='Highlight'
              >
                <Icon className='text-lg' icon={'lucide:highlighter'} />
              </Button>
            )}
            {disabled?.hardBreak !== true && (
              <Button
                onClick={() => editor.chain().focus().setHardBreak().run()}
                size='sm'
                type='button'
                variant={'outline'}
                title='Hard Break'
              >
                <Icon className='text-lg' icon={'mdi:wrap'} />
              </Button>
            )}
            {disabled?.textAlign !== true && (
              <>
                <Button
                  type='button'
                  onClick={() => editor.chain().focus().setTextAlign('left').run()}
                  variant={editor.isActive({ textAlign: 'left' }) ? 'default' : 'outline'}
                  size='sm'
                  title='Text Align Left'
                >
                  <Icon className='text-lg' icon={'lucide:align-left'} />
                </Button>
                <Button
                  type='button'
                  onClick={() => editor.chain().focus().setTextAlign('center').run()}
                  variant={editor.isActive({ textAlign: 'center' }) ? 'default' : 'outline'}
                  size='sm'
                  title='Text Align Center'
                >
                  <Icon className='text-lg' icon={'lucide:align-center'} />
                </Button>
                <Button
                  type='button'
                  onClick={() => editor.chain().focus().setTextAlign('right').run()}
                  variant={editor.isActive({ textAlign: 'right' }) ? 'default' : 'outline'}
                  size='sm'
                  title='Text Align Right'
                >
                  <Icon className='text-lg' icon={'lucide:align-right'} />
                </Button>
              </>
            )}
            {disabled?.link !== true && (
              <Button
                variant={editor.isActive('link') ? 'default' : 'outline'}
                size='sm'
                onClick={handleLinkClick}
                disabled={!hasTextSelection()}
                title={
                  hasTextSelection()
                    ? editor.isActive('link')
                      ? 'Edit Link'
                      : 'Add Link'
                    : 'Select text to add link'
                }
                type='button'
              >
                <Icon icon='tabler:link' className='w-4 h-4' />
              </Button>
            )}

            {/* Remove Link */}
            {editor.isActive('link') && (
              <Button
                variant='outline'
                size='sm'
                onClick={handleLinkRemove}
                title='Remove Link'
                type='button'
              >
                <Icon icon='tabler:link-off' className='w-4 h-4' />
              </Button>
            )}

            {disabled?.undo !== true && (
              <Button
                onClick={() => editor.chain().focus().undo().run()}
                variant={'outline'}
                size={'sm'}
                type='button'
                title='Undo'
              >
                <Icon className='text-lg' icon={'material-symbols:undo-rounded'} />
              </Button>
            )}
            {disabled?.redo !== true && (
              <Button
                onClick={() => editor.chain().focus().redo().run()}
                variant={'outline'}
                size={'sm'}
                type='button'
                title='Redo'
              >
                <Icon className='text-lg' icon={'material-symbols:redo-rounded'} />
              </Button>
            )}
          </div>
          <p className='text-xs text-muted-foreground'>* Shift + Enter to add a line break</p>
        </CardHeader>
        <Separator />
        <CardContent>
          <div onClick={() => editor.chain().focus()} className='min-h-[100px] w-full!'>
            <div className='h-full prose dark:prose-invert w-full!'>
              <EditorContent editor={editor} />
            </div>
          </div>
        </CardContent>
      </Card>
      <LinkModal
        open={showLinkModal}
        onOpenChange={setShowLinkModal}
        onLinkSet={handleLinkSet}
        onLinkRemove={handleLinkRemove}
        initialUrl={linkData.url}
        initialOpenInNewTab={linkData.openInNewTab}
        isEditing={linkData.isEditing}
      />
    </div>
  );
};

export default FeaturedCustomEditor;
