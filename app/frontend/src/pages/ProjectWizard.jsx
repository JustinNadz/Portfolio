import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { 
  Form, 
  Input, 
  Select, 
  Button, 
  Steps, 
  message, 
  Spin
} from 'antd';
import { 
  InfoCircleOutlined,
  UserOutlined,
  CloseOutlined
} from '@ant-design/icons';
import './ProjectWizard.scss';

const { TextArea } = Input;
const { Option } = Select;

const ProjectWizard = ({ embedded = false, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isValid },
    trigger
  } = useForm({
    mode: 'onChange',
    defaultValues: {
    projectName: '',
    projectType: '',
    description: '',
    timeline: '',
    budget: '',
    name: '',
    email: '',
      phone: ''
    }
  });

  const watchedValues = watch();

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('projectWizardProgress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        Object.keys(parsed).forEach(key => {
          setValue(key, parsed[key]);
        });
      } catch (error) {
        console.error('Error loading saved progress:', error);
      }
    }
  }, [setValue]);

  // Save progress to localStorage
  useEffect(() => {
    const saveProgress = () => {
      localStorage.setItem('projectWizardProgress', JSON.stringify(watchedValues));
    };
    
    const timeoutId = setTimeout(saveProgress, 1000);
    return () => clearTimeout(timeoutId);
  }, [watchedValues]);

  const next = async () => {
    const isStepValid = await trigger();
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(1, prev + 1));
    } else {
      message.error('Please fill in all required fields correctly');
    }
  };

  const prev = () => setCurrentStep((prev) => Math.max(0, prev - 1));

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Clear saved progress
    localStorage.removeItem('projectWizardProgress');
    
    setIsSubmitting(false);
    message.success('Project request submitted successfully! We will reach out within 24 hours.');
    
    // Reset form
    Object.keys(data).forEach(key => setValue(key, ''));
    setCurrentStep(0);
    
    if (onClose) {
      onClose();
    } else {
      // Navigate back to home page after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  const steps = [
    {
      title: 'Project Details',
      icon: <InfoCircleOutlined />,
      description: 'Tell us about your project'
    },
    {
      title: 'Contact Info',
      icon: <UserOutlined />,
      description: 'How to reach you'
    }
  ];

  const projectTypes = [
    { value: 'Website', label: 'Website' },
    { value: 'Web App', label: 'Web Application' },
    { value: 'Mobile App', label: 'Mobile App' },
    { value: 'Portfolio', label: 'Portfolio Site' },
    { value: 'E-commerce', label: 'E-commerce Site' },
    { value: 'LGU Project', label: 'LGU/Government Project' },
    { value: 'Other', label: 'Other' }
  ];

  const timelines = [
    { value: '1-2 weeks', label: '1-2 weeks' },
    { value: '3-4 weeks', label: '3-4 weeks' },
    { value: '1-2 months', label: '1-2 months' },
    { value: '2+ months', label: '2+ months' },
    { value: 'Flexible', label: 'Flexible' }
  ];

  const budgets = [
    { value: 'Under $500', label: 'Under $500' },
    { value: '$500-$1000', label: '$500-$1000' },
    { value: '$1000-$2000', label: '$1000-$2000' },
    { value: '$2000-$5000', label: '$2000-$5000' },
    { value: '$5000+', label: '$5000+' },
    { value: 'Discuss', label: 'Let\'s discuss' }
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
  return (
          <div className="project-wizard__step-content">
            <div className="project-wizard__step-content-header">
              <div className="project-wizard__step-content-header-icon">
                <InfoCircleOutlined />
              </div>
              <div className="project-wizard__step-content-header-text">
                <h3>Project Information</h3>
                <p>Tell us about your project in simple terms.</p>
          </div>
        </div>

            <div className="project-wizard__form">
              <Form.Item
                label="Project Name"
                required
                validateStatus={errors.projectName ? 'error' : ''}
                help={errors.projectName?.message}
              >
                <Controller
                  name="projectName"
                  control={control}
                  rules={{ 
                    required: 'Project name is required',
                    minLength: { value: 3, message: 'Project name must be at least 3 characters' }
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="e.g., My Portfolio Website"
                      size="large"
                    />
                  )}
                />
              </Form.Item>

              <Form.Item
                label="Project Type"
                required
                validateStatus={errors.projectType ? 'error' : ''}
                help={errors.projectType?.message}
              >
                <Controller
                  name="projectType"
                  control={control}
                  rules={{ required: 'Project type is required' }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Select project type"
                      size="large"
                    >
                      {projectTypes.map(type => (
                        <Option key={type.value} value={type.value}>
                          {type.label}
                        </Option>
                      ))}
                    </Select>
                  )}
                />
              </Form.Item>

              <Form.Item
                label="Project Description"
                required
                validateStatus={errors.description ? 'error' : ''}
                help={errors.description?.message}
              >
                <Controller
                  name="description"
                  control={control}
                  rules={{ 
                    required: 'Project description is required',
                    minLength: { value: 15, message: 'Description must be at least 15 characters' }
                  }}
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      rows={4}
                      placeholder="Describe what you want to build and what problem it solves..."
                      size="large"
                    />
                  )}
                />
              </Form.Item>

              <div className="timeline-budget-row">
                <Form.Item
                  label="Timeline"
                >
                  <Controller
                    name="timeline"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder="Select timeline"
                        size="large"
                      >
                        {timelines.map(timeline => (
                          <Option key={timeline.value} value={timeline.value}>
                            {timeline.label}
                          </Option>
                        ))}
                      </Select>
                    )}
                  />
                </Form.Item>

                <Form.Item
                  label="Budget Range"
                >
                  <Controller
                    name="budget"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder="Select budget"
                        size="large"
                      >
                        {budgets.map(budget => (
                          <Option key={budget.value} value={budget.value}>
                            {budget.label}
                          </Option>
                        ))}
                      </Select>
                    )}
                  />
                </Form.Item>
                </div>
                </div>
              </div>
        );

      case 1:
        return (
          <div className="project-wizard__step-content">
            <div className="project-wizard__step-content-header">
              <div className="project-wizard__step-content-header-icon">
                <UserOutlined />
              </div>
              <div className="project-wizard__step-content-header-text">
                <h3>Contact Information</h3>
                <p>How can we reach you to discuss your project?</p>
                </div>
              </div>

            <div className="project-wizard__form">
              <div className="timeline-budget-row">
                <Form.Item
                  label="Your Name"
                  required
                  validateStatus={errors.name ? 'error' : ''}
                  help={errors.name?.message}
                >
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: 'Name is required' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Your full name"
                        size="large"
                      />
                    )}
                  />
                </Form.Item>

                <Form.Item
                  label="Email"
                  required
                  validateStatus={errors.email ? 'error' : ''}
                  help={errors.email?.message}
                >
                  <Controller
                    name="email"
                    control={control}
                    rules={{ 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="your.email@example.com"
                        size="large"
                      />
                    )}
                  />
                </Form.Item>
              </div>

              <Form.Item label="Phone Number (Optional)">
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="+1 (555) 123-4567"
                      size="large"
                    />
                  )}
                />
              </Form.Item>
                </div>
              </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`project-wizard ${embedded ? 'project-wizard--embedded' : ''}`}>
      <div className="project-wizard__container">
        <div className="project-wizard__header">
          <h2>Start Your Project</h2>
          <p>Tell us about your project and we'll get back to you within 24 hours</p>
          
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={onClose || (() => navigate('/'))}
            className="project-wizard__header-close"
          />
              </div>

        <div className="project-wizard__steps">
          <Steps
            current={currentStep}
            items={steps}
            size="small"
          />
              </div>

        <div className="project-wizard__content">
          {renderStepContent()}
        </div>

        <div className="project-wizard__footer">
          <div className="project-wizard__footer-buttons">
            {currentStep > 0 && (
              <Button
                size="large"
                onClick={prev}
                className="project-wizard__footer-button project-wizard__footer-button--secondary"
              >
            Previous
              </Button>
            )}
            
            {currentStep < steps.length - 1 ? (
              <Button
                type="primary"
                size="large"
                onClick={next}
                className="project-wizard__footer-button"
              >
                Next
              </Button>
            ) : (
              <Button
                type="primary"
                size="large"
                onClick={handleSubmit(onSubmit)}
                loading={isSubmitting}
                className="project-wizard__footer-button"
              >
              Submit Project Request
              </Button>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectWizard;


